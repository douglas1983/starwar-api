import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PeopleController],
  providers: [PeopleService],
  imports: [HttpModule],
})
export class PeopleModule {}
