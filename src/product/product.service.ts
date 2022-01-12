import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
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

  async findAll() {
    const allMovies = await this.database.product.findMany();
    return allMovies;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
