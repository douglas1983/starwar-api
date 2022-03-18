import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PagnationParams } from 'src/utils/types/paginationParams';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UsePipes(ValidationPipe)
  findAll(@Query() { page = 1, size = 10, orderBy = '' }: PagnationParams) {
    return this.userService.findAll({ page, size, orderBy });
  }

  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.userService.findOne(_id);
  }

  @Put(':id')
  update(@Param('id') _id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(_id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') _id: string) {
    return this.userService.remove(_id);
  }
}
