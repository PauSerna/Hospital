import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('El email ya está registrado.');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role_id: dto.role_id, 
      },
    });

    return user;
  }
  async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException('Usuario no encontrado');

    const passwordValid = await bcrypt.compare(currentPassword, user.password);
    if (!passwordValid) throw new BadRequestException('Contraseña actual incorrecta');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }
  private transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: 'api',
      pass: '41c1e7034d706bc778bad9614acd144c',
    },
  });
  

  async sendRecoveryEmail(email: string, randomKey: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'sandbox@inbox.mailtrap.email',
      to: email,
      subject: 'Recuperación de Contraseña',
      text: `Tu código de recuperación es: ${randomKey}`,
    });
  }

  async requestPasswordRecovery(email: string): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('Usuario no encontrado');

    const randomKey = uuidv4();
    await this.prisma.user.update({
      where: { email },
      data: { random_key: randomKey }
    });

    await this.sendRecoveryEmail(email, randomKey);
    return randomKey;
  }

  async resetPassword(randomKey: string, newPassword: string): Promise<void> {
    const user = await this.prisma.user.findFirst({ where: { random_key: randomKey } });
    if (!user) throw new BadRequestException('Código de recuperación inválido');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, random_key: "" }
    });
  }
}
