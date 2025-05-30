import { IsEmail, IsNotEmpty, MinLength, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsInt()
  role_id: number;
}
