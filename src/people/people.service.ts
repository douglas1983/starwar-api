import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';

@Injectable()
export class PeopleService {
  constructor(private httpService: HttpService) {}

  findAll(page: number): Observable<AxiosResponse<any[]>> {
    return this.httpService
      .get(`https://swapi.dev/api/people?page=${page} `)
      .pipe(
        map((response) => {
          return response.data.results;
        }),
      );
  }

  findOne(id: number) {
    return this.httpService.get(`https://swapi.dev/api/people/${id}`).pipe(
      map((response) => {
        return response.data;
      }),
    );
  }
}
