import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
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
  update(@AuthUser() user: User, @Body() data: UpdateUserDto) {
    return this.service.update(user, data);
  }

  @UseGuards(AuthGuard())
  @Delete()
  remove(@AuthUser() id: string) {
    return this.service.remove(id);
  }

  @UseGuards(AuthGuard())
  @Patch('/cart/:id')
  addToCart(@AuthUser() user: User, @Param('id') productID: string) {
    return this.service.cart(user, productID);
  }
}
