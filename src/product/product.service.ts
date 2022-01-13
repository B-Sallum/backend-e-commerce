import { PrismaService } from 'src/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private database: PrismaService) {}

  async create(data: CreateProductDto): Promise<Product> {
    const product = await this.database.product.create({ data });

    return product;
  }

  async findAll(): Promise<Product[]> {
    const allMovies = await this.database.product.findMany();
    return allMovies;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.database.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Sorry, product not found under this ID');
    }

    return product;
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    const checkProduct = await this.database.product.findUnique({
      where: { id },
    });

    if (!checkProduct) {
      throw new NotFoundException('Product not found');
    }

    const product = await this.database.product.update({
      where: { id },
      data: data,
    });

    return product;
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.database.product.delete({
      where: { id },
    });

    return { message: 'Product removed' };
  }
}
