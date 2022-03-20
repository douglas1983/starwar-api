import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PagnationParams } from '../utils/types/paginationParams';
import { PeopleService } from './people.service';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('people')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @UsePipes(ValidationPipe)
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
  })
  @Get()
  findAll(@Query() { page = 1 }: PagnationParams) {
    return this.peopleService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(+id);
  }
}
