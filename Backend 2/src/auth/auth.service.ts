import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly Prisma: PrismaService,
    private readonly Jwt: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.Prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('No existe el usuario');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { email: user.email };
    const access_token = this.Jwt.sign(payload);

    return { user, token: access_token };
  }
}
