import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./auth/entities/user.entity";
import { ProductModule } from "./product/product.module";
import { CustomLogger } from "./logger/custom-logger";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      username: "postgres",
      port: 5000,
      password: String(process.env.DB_PASSWORD as string),
      database: String(process.env.DB_DATABASE as string),
      synchronize: true,
      entities: [User],
      logging: false,
    }),
    AuthModule,
    ProductModule,
  ],
  controllers: [],
  providers: [CustomLogger],
})
export class AppModule {}
