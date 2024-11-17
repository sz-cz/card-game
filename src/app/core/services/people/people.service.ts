import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import {
  API_URL,
  ApiResponse,
  PersonApiResponse,
  PersonProperties,
} from '../../../shared';
import { ScoreService } from '..';

export const PEOPLE_URL = `${API_URL}people/`;

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  #http = inject(HttpClient);
  #stateService = inject(ScoreService);
  #availalbeUids: string[];

  #getPeople(params: HttpParams): Observable<ApiResponse> {
    return this.#http.get<ApiResponse>(PEOPLE_URL, { params });
  }

  #getPerson(uid: string): Observable<PersonApiResponse> {
    return this.#http.get<PersonApiResponse>(PEOPLE_URL + uid);
  }

  #getTotalRecordsNumber(): Observable<number> {
    const params = new HttpParams().append('page', 1).append('limit', 1);
    return this.#getPeople(params).pipe(map((resp) => resp.total_records));
  }

  #getAvailalbleUids(totalRecordsNumber: number): Observable<string[]> {
    const params = new HttpParams()
      .append('page', 1)
      .append('limit', totalRecordsNumber);
    return this.#getPeople(params).pipe(
      map((resp) => resp.results.map((person) => person.uid))
    );
  }

  #getRandomPerson(): Observable<PersonApiResponse> {
    const randomUid =
      this.#availalbeUids[
        Math.floor(Math.random() * this.#availalbeUids.length)
      ];
    return this.#getPerson(randomUid);
  }

  getRandomPeople(): Observable<[PersonProperties, PersonProperties]> {
    return forkJoin([this.#getRandomPerson(), this.#getRandomPerson()]).pipe(
      map(([resp1, resp2]): [PersonProperties, PersonProperties] => [
        resp1.result.properties,
        resp2.result.properties,
      ]),
      tap((resp) => {
        this.#stateService.compareMass(resp[0].mass, resp[1].mass);
      })
    );
  }

  constructor() {
    this.#getTotalRecordsNumber()
      .pipe(
        switchMap((totalRecordsNumber) =>
          this.#getAvailalbleUids(totalRecordsNumber)
        )
      )
      .subscribe((availableUids) => {
        this.#availalbeUids = availableUids;
        console.log(this.#availalbeUids);
      });
  }
}
