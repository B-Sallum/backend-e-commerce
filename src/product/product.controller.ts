import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post('create')
  create(@Body() data: CreateProductDto): Promise<Product> {
    return this.service.create(data);
  }

  @Get('all')
  findAll(): Promise<Product[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<Product> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.remove(id);
  }
}
