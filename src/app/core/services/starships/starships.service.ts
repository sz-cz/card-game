import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import {
  API_URL,
  StarshipApiResponse,
  StarshipPropertiesTuple,
} from '../../../shared';
import { ResourcesBaseService } from '../resources-base/resources-base.service';

const STARSHIPS_URL = `${API_URL}starships/`;

@Injectable({
  providedIn: 'root',
})
export class StarshipsService extends ResourcesBaseService {
  #getStarship(uid: string): Observable<StarshipApiResponse> {
    return this.http.get<StarshipApiResponse>(this.resourceApiUrl + uid);
  }

  #getRandomStarship(availableUids: string[]): Observable<StarshipApiResponse> {
    const randomUid =
      availableUids[Math.floor(Math.random() * availableUids.length)];
    return this.#getStarship(randomUid);
  }

  getTwoRandomStarships(): Observable<StarshipPropertiesTuple> {
    return this.availalbeUids$.pipe(
      switchMap((uids) =>
        forkJoin([
          this.#getRandomStarship(uids),
          this.#getRandomStarship(uids),
        ]).pipe(
          map(
            ([reps1, resp2]): StarshipPropertiesTuple => [
              reps1.result.properties,
              resp2.result.properties,
            ]
          )
        )
      )
    );
  }

  constructor() {
    super(STARSHIPS_URL);
  }
}
