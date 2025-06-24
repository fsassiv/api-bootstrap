import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterSsoUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  provider: string;

  @IsString()
  @IsNotEmpty()
  providerId: string;

  ssoEmailVerified: boolean;
}
