import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import {
  API_URL,
  ApiResponse,
  StarshipApiResponse,
  StarshipPropertiesTuple,
} from '../../../shared';
import { ScoreService } from '..';

const STARSHIPS_URL = `${API_URL}starships/`;

@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  #http = inject(HttpClient);
  #scoreService = inject(ScoreService);
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

  getRandomStarships(): Observable<StarshipPropertiesTuple> {
    return forkJoin([
      this.#getRandomStarship(),
      this.#getRandomStarship(),
    ]).pipe(
      map(
        ([reps1, resp2]): StarshipPropertiesTuple => [
          reps1.result.properties,
          resp2.result.properties,
        ]
      ),
      tap((resp) => {
        this.#scoreService.compareStrategicProperty(resp[0].crew, resp[1].crew);
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
