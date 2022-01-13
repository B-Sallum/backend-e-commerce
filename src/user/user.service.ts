import { PrismaService } from './../prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Product, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private database: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    if (data.pass !== data.passConfirm) {
      throw new UnauthorizedException("Passwords don't match");
    } else {
      delete data.passConfirm;
    }

    const checkUser = await this.database.user.findUnique({
      where: { email: data.email },
    });

    if (checkUser) {
      throw new ConflictException('Email already in use');
    }

    const salt = 10;
    const hashPass = await bcrypt.hash(data.pass, salt);

    const user = await this.database.user.create({
      data: {
        ...data,
        pass: hashPass,
      },
    });

    delete user.pass;
    return user;
  }

  async update(user: User, data: UpdateUserDto): Promise<User> {
    const checkUser = await this.database.user.findUnique({
      where: { id: user.id },
    });

    if (!checkUser) {
      throw new NotFoundException('User not found under this ID');
    }

    const upUser = await this.database.user.update({
      where: { id: user.id },
      data,
    });

    delete user.pass;

    return upUser;
  }

  async remove(user: User): Promise<{ message: string }> {
    await this.database.user.delete({
      where: { id: user.id },
    });
    return { message: 'We hope see you again' };
  }

  async getCart(user: User): Promise<Product[]> {
    const consult = await this.database.user.findUnique({
      where: { id: user.id },
      include: {
        cart: true,
      },
    });

    return consult.cart;
  }

  async switchCart(
    user: User,
    productID: string,
  ): Promise<{ message: string }> {
    const product = await this.database.product.findUnique({
      where: { id: productID },
    });

    if (!product) {
      throw new NotFoundException('There is no product under this ID');
    }

    const cart = await this.getCart(user);

    let foundProduct = false;

    cart.map((product) => {
      if (product.id === productID) {
        foundProduct = true;
      }
    });

    if (foundProduct) {
      await this.database.user.update({
        where: { id: user.id },
        data: {
          cart: {
            disconnect: {
              id: productID,
            },
          },
        },
        include: {
          cart: true,
        },
      });

      return { message: 'Item removed from the cart' };
    } else {
      await this.database.user.update({
        where: { id: user.id },
        data: {
          cart: {
            connect: {
              id: productID,
            },
          },
        },
        include: {
          cart: true,
        },
      });

      return { message: 'Product added to Cart' };
    }
  }
}
