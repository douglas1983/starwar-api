import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
