import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import {
  API_URL,
  PersonApiResponse,
  PersonPropertiesTuple,
} from '../../../shared';
import { ResourcesBaseService } from '../resources-base/resources-base.service';

export const PEOPLE_API_URL = `${API_URL}people/`;

@Injectable({
  providedIn: 'root',
})
export class PeopleService extends ResourcesBaseService {
  #getPerson(uid: string): Observable<PersonApiResponse> {
    return this.http.get<PersonApiResponse>(this.resourceApiUrl + uid);
  }

  #getRandomPerson(availableUids: string[]): Observable<PersonApiResponse> {
    const randomUid =
      availableUids[Math.floor(Math.random() * availableUids.length)];
    return this.#getPerson(randomUid);
  }

  getTwoRandomPeople(): Observable<PersonPropertiesTuple> {
    return this.availalbeUids$.pipe(
      switchMap((uids) =>
        forkJoin([
          this.#getRandomPerson(uids),
          this.#getRandomPerson(uids),
        ]).pipe(
          map(
            ([resp1, resp2]): PersonPropertiesTuple => [
              resp1.result.properties,
              resp2.result.properties,
            ]
          )
        )
      )
    );
  }

  constructor() {
    super(PEOPLE_API_URL);
  }
}
