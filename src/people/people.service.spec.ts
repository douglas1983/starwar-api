import { Test, TestingModule } from '@nestjs/testing';
import { PeopleService } from './people.service';
import { HttpModule } from '@nestjs/axios';

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeopleService],
      imports: [HttpModule],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
