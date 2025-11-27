import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './schema/user.schema';
import { CreateUserDto, verifyDto } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';
import  nodemailer from "nodemailer"

@Injectable()
export class AuthService {
private transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"dinoraromonberganova@gmail.com",
        pass:process.env.APP_KEY as string
    }
})
  constructor(@InjectModel(User) private userModel:typeof User){}
async register(CreateUserDto:CreateUserDto):Promise<{message:string}>{
  const {username,email,password}=CreateUserDto  

  const foundedUser=await this.userModel.findOne({where:{email}})

  if(foundedUser){
    throw new UnauthorizedException("User alredy exists")
  }

  

const hash = await bcrypt.hash(password, 10 );

const randomNumber=Array.from({length:6},()=>Math.floor(Math.random ())*10).join("")
await this.transporter.sendMail({
    from:"dinoraromonberganova@gmail.com",
    to:email,
    subject:"test",
    text:`${randomNumber}`
})

await this.userModel.create({username,email,password,hash,otp:randomNumber,otpTime:Date.now()+12000})
return {message:"Registered"}
}

  


async verify(verifyDto:verifyDto):Promise<{message:string}>{
  const {email,otp}=verifyDto  

  const foundedUser=await this.userModel.findOne({where:{email}})

  if(!foundedUser){
    throw new UnauthorizedException("User is not found")
  }

  



return {message:"verify"}
}

  

}
