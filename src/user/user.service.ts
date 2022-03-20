import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { PagnationParams } from 'src/utils/types/paginationParams';
import { convertOrderby } from 'src/utils/functions/convertOrderby';
import { ResponsePagination } from 'src/utils/types/responsePagination';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  saltOrRounds = 10;
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = this.findByEmail(data.email);
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
