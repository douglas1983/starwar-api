import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { PagnationParams } from '../utils/types/paginationParams';
import { convertOrderby } from '../utils/functions/convertOrderby';
import { ResponsePagination } from '../utils/types/responsePagination';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDTO } from './dto/updatePassword.dto';

@Injectable()
export class UserService {
  saltOrRounds = 10;
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = await this.findByEmail(data.email);
    console.log(user);
    if (user) {
      throw new BadRequestException(
        `User with email ${data.email} already exists`,
      );
    }
    const newUser = { ...data };
    const hash = await bcrypt.hash(data.password, this.saltOrRounds);
    newUser.password = hash;
    return await this.prisma.user.create({
      data: newUser,
    });
  }

  async findAll(params: PagnationParams): Promise<ResponsePagination> {
    const { page, size, orderBy } = params;

    const order = convertOrderby(orderBy);

    const data = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
      skip: (page - 1) * size,
      take: Number(size),
      orderBy: order,
    });
    const totalItems = await this.prisma.user.count();

    return new ResponsePagination(totalItems, data, page, size);
  }

  async findOne(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id: +id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return await this.prisma.user.update({
      data,
      where: { id: +id },
    });
  }

  async updatePassword(id: string, data: UpdatePasswordDTO): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const isValid = await bcrypt.compare(data.old, user.password);

    if (!isValid) {
      throw new BadRequestException('Old password is not valid');
    }

    const hash = await bcrypt.hash(data.new, this.saltOrRounds);

    user.password = hash;
    return await this.prisma.user.update({
      data: user,
      where: { id: +id },
    });
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return await this.prisma.user.delete({
      where: { id: +id },
    });
  }
}
