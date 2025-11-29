import { Body, Controller, Delete, HttpCode, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto, verifyDto } from './dto/create_user.dto';

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
  
  @HttpCode(200)
  @Post("login")
  login(@Body() LoginDto:LoginDto){
    return this.authService.login(LoginDto)

  }
  @HttpCode(200)
  @Delete("delete/:id")
  deleteUser(@Param("id") id:string){
    return this.authService.deleteUser(id)
  }
}
