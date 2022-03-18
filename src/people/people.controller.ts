import { Controller, Get, Param, Query } from '@nestjs/common';
import { PagnationParams } from 'src/utils/types/paginationParams';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  findAll(@Query() { page = 1 }: PagnationParams) {
    return this.peopleService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(+id);
  }
}
