import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({
    example: 'teste@teste.com',
    description: 'Email do usuário cadastrados',
  })
  @IsEmail()
  username: string;
  @ApiProperty({ example: '123456' })
  @IsString()
  password: string;
}
