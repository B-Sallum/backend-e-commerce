import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthResponse, CredentialsDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private database: PrismaService, private jwt: JwtService) {}

  async login(loginData: CredentialsDto): Promise<AuthResponse> {
    const { email, pass } = loginData;

    const user = await this.database.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const ok = await bcrypt.compare(pass, user.pass);

    if (ok) {
      const payload = {
        email: user.email,
      };

      const token = this.jwt.sign(payload);

      delete user.pass;

      return { token, user };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
