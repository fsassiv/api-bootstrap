import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { messages } from './auth.dto-messages';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: messages.unqualifiedPassword },
  )
  password: string;
}

export class SignUpDto extends SignInDto {}

export class RefreshTokenDto {
  @IsString()
  token: string;
}

export class ChangePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: messages.unqualifiedPassword },
  )
  newPassword: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
