import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "./entities/user.entity";
import { CreateUserDto, LoginDto, verifyDto } from "./dto/create_user.dto";
import * as bcrypt from "bcrypt";
import * as nodemailer from "nodemailer";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dinoraromonberganova@gmail.com",
      pass: process.env.APP_KEY,
    },
  });

  constructor(
    @InjectRepository(User) private  userRepo: Repository<User>,
    private  jwtService: JwtService
  ) {}

  // ================= REGISTER ===================
  async register(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    const foundedUser = await this.userRepo.findOne({ where: { email } });
    if (foundedUser) {
      throw new UnauthorizedException("User already exists");
    }

    const hash = await bcrypt.hash(password, 10);

    // const randomNumber = Math.floor(Math.random() * 1000000)
      // .toString()
      // .padStart(6, "0");

      const randomNumber=+Array.from({length:6},()=>Math.floor(Math.random()*10)).join("")

    await this.transporter.sendMail({
      from: "dinoraromonberganova@gmail.com",
      to: email,
      subject: "Verification Code",
      text: `Your verification code is: ${randomNumber}`,
    });

    const time = Date.now() + 120000;

    const newUser = this.userRepo.create({
      username,email,password: hash,otp: randomNumber,otpTime: time
    });

    return this.userRepo.save(newUser);
  }

  // ================= VERIFY OTP ===================
  async verify(verifyDto: verifyDto): Promise<{ message: string }> {
    const { email, otp } = verifyDto;

    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException("User not found");

    // ✔ otpTime null bo‘lsa ham error bermaydi
    const time = Date.now();
    if (!user.otpTime || user.otpTime < time) {
      throw new BadRequestException("OTP expired");
    }
 
    if (+user.otp !== +otp) {
      throw new BadRequestException("Invalid OTP");
    }

    user.isVerify = true; // ✔ TUZATILDI
    user.otp = 0;
    user.otpTime =0

    await this.userRepo.save(user);

    return { message: "Email verified successfully" };
  }

  // ================= LOGIN ===================
  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    const user = await this.userRepo.findOne({
      where: { email },
      select: ["id", "username", "email", "password", "isVerify"],
    });

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // ✔ isVerify → isVerified
    if (!user.isVerify) {
      throw new UnauthorizedException("Please verify your email first");
    }

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // ================= DELETE USER ===================
  async deleteUser(id: string): Promise<{ message: string }> {
    const result = await this.userRepo.delete(id);

    if (result.affected === 0) {
      throw new BadRequestException("User not found");
    }

    return { message: "User deleted successfully" };
  }
}
 