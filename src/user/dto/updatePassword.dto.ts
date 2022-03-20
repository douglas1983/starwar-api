import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDTO {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  old: string;
  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  new: string;
}
