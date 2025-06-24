import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSsoUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  provider: string;

  @IsString()
  @IsNotEmpty()
  providerId: string;

  @IsBoolean()
  ssoEmailVerified: boolean;
}
