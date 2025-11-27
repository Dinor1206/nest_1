import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';






@Module({
  imports: [
  ConfigModule.forRoot({envFilePath:".env",isGlobal:true})  ,
  SequelizeModule.forRoot({
    dialect:"postgres",
    username:"postgres",
    port:5000,
    password:String(process.env.DB_PASSWORD as string),
    database:String(process.env.DB_DATABASE as string),
    synchronize:true,
  
    autoLoadModels:true

  }),
  AuthModule,
  
    
  
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
