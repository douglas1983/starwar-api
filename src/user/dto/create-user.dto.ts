import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(11)
  telefone: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
