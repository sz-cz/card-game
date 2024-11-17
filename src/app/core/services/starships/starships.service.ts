import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import {
  API_URL,
  ApiResponse,
  StarshipApiResponse,
  StarshipDetail,
} from '../../../shared';
import { ScoreService } from '..';

const STARSHIPS_URL = `${API_URL}starships/`;

@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  #http = inject(HttpClient);
  #stateService = inject(ScoreService);
  #availalbeUids: string[];

  #getStarships(params: HttpParams): Observable<ApiResponse> {
    return this.#http.get<ApiResponse>(STARSHIPS_URL, { params });
  }

  getStarship(): Observable<StarshipApiResponse> {
    return this.#http.get<StarshipApiResponse>(STARSHIPS_URL + '1');
  }

  #getTotalRecordsNumber(): Observable<number> {
    const params = new HttpParams().append('page', 1).append('limit', 1);
    return this.#getStarships(params).pipe(map((resp) => resp.total_records));
  }

  #getAvailalbleUids(totalRecordsNumber: number): Observable<string[]> {
    const params = new HttpParams()
      .append('page', 1)
      .append('limit', totalRecordsNumber);
    return this.#getStarships(params).pipe(
      map((resp) => resp.results.map((person) => person.uid))
    );
  }

  #getRandomStarship(): Observable<StarshipApiResponse> {
    const randomUid =
      this.#availalbeUids[
        Math.floor(Math.random() * this.#availalbeUids.length)
      ];
    return this.#http.get<StarshipApiResponse>(STARSHIPS_URL + randomUid);
  }

  getRandomStarships(): Observable<[StarshipDetail, StarshipDetail]> {
    return forkJoin([
      this.#getRandomStarship(),
      this.#getRandomStarship(),
    ]).pipe(map(([reps1, resp2]) => [reps1.result, resp2.result]));
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
