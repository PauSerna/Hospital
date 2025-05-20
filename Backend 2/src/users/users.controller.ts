import { Controller, Post, Body,Get, UseGuards, Req, Put, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/changepassword.dto';
import { RecoverPasswordDto, ResetPasswordDto } from './dto/recoverpassword.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UseGuards(AuthGuard('jwt'))
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
  
  @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    getProfile(@Req() req) {
      return { message: 'Ruta protegida', user: req.user };
    }

  @Patch('changepassword')
  async changePassword(@Req() req, @Body() dto: ChangePasswordDto): Promise<{ message: string }> {
    await this.usersService.changePassword(dto.userId, dto.currentPassword, dto.newPassword);
    return { message: 'Contraseña actualizada exitosamente' };
  }
  @Post('recoverpassword')
  async recoverPassword(@Body() dto: RecoverPasswordDto): Promise<{ message: string }> {
    await this.usersService.requestPasswordRecovery(dto.email);
    return { message: 'Se ha enviado el código de recuperación al correo' };
  }

  @Post('resetpassword')
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<{ message: string }> {
    await this.usersService.resetPassword(dto.randomKey, dto.newPassword);
    return { message: 'Contraseña actualizada exitosamente' };
  }
}