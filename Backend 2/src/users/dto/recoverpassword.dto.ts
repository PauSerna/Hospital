export class RecoverPasswordDto {
  email: string;
}

export class ResetPasswordDto {
  randomKey: string;
  newPassword: string;
}