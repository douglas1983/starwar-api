// import { PickType } from '@nestjs/mapped-types';
import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PickType(CreateUserDto, [
  'name',
  'telefone',
]) {}
