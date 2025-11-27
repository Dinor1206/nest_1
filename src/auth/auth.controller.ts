import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, verifyDto } from './dto/create_user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post("register")
  register(@Body() createUserDto:CreateUserDto){
    return this.authService.register(createUserDto)

  }

  @HttpCode(200)
  @Post("verify")
  verify(@Body() verifydto:verifyDto){
    return this.authService.verify(verifydto)

  }
}
