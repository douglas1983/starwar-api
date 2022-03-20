import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty()
  @IsEmail()
  username: string;
  @ApiProperty()
  @IsString()
  password: string;
}
