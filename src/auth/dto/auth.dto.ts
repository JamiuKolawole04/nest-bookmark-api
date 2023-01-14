import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Length(5, 60)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 30)
  password: string;
}
