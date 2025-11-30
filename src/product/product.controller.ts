import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { AuthGuard } from "src/common/guards/auth-guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/constants/role";

@UseGuards(AuthGuard, RolesGuard)
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get()
  findAll() {
    return this.productService.findAll();
  }
  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }
  @Roles(UserRole.ADMIN)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }
  @Roles(UserRole.ADMIN)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
