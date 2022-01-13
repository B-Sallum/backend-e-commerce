import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Product, User } from '@prisma/client';
import AuthUser from 'src/auth/auth-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('register')
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  update(@AuthUser() user: User, @Body() data: UpdateUserDto): Promise<User> {
    return this.service.update(user, data);
  }

  @UseGuards(AuthGuard())
  @Delete()
  remove(@AuthUser() user: User): Promise<{ message: string }> {
    return this.service.remove(user);
  }

  @UseGuards(AuthGuard())
  @Patch('/cart/:id')
  addToCart(
    @AuthUser() user: User,
    @Param('id') productID: string,
  ): Promise<{ message: string }> {
    return this.service.switchCart(user, productID);
  }

  @UseGuards(AuthGuard())
  @Get('cart')
  getCart(@AuthUser() user: User): Promise<Product[]> {
    return this.service.getCart(user);
  }
}
