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
  Req,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDTO } from './dto/updatePassword.dto';
import { PagnationParams } from '../utils/types/paginationParams';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'size',
    type: 'number',
    allowEmptyValue: true,
    required: false,
  })
  @ApiQuery({
    name: 'orderBy',
    type: 'string',
    allowEmptyValue: true,
    required: false,
  })
  findAll(@Query() { page = 1, size = 10, orderBy = '' }: PagnationParams) {
    return this.userService.findAll({ page, size, orderBy });
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') _id: string) {
    const user = await this.userService.findOne(_id);
    const { password, ...rest } = user;
    return rest;
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async update(
    @Param('id') _id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    if (req.user.userId !== Number(_id)) {
      throw new BadRequestException('You can only update your own profile');
    }

    const user = await this.userService.update(_id, updateUserDto);
    const { password, ...rest } = user;
    return rest;
  }
  @Put(':id/password')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async updatepassowrd(
    @Param('id') _id: string,
    @Body() updatepassowrd: UpdatePasswordDTO,
    @Req() req,
  ) {
    if (req.user.userId !== Number(_id)) {
      throw new BadRequestException('You can only update your own profile');
    }

    const user = await this.userService.updatePassword(_id, updatepassowrd);
    const { password, ...rest } = user;
    return rest;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') _id: string, @Req() req) {
    if (req.user.userId !== Number(_id)) {
      throw new BadRequestException('You can only delete your own profile');
    }
    return this.userService.remove(_id);
  }
}
