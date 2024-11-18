import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  PersonPropertiesTuple,
  ResourceType,
  StarshipPropertiesTuple,
} from '../../../shared';
import { PeopleService, ScoreService, StarshipsService } from '../..';

@Injectable({
  providedIn: 'root',
})
export class ResourcesFacade {
  #peopleService = inject(PeopleService);
  #starshipsService = inject(StarshipsService);
  #scoreService = inject(ScoreService);

  readonly #currentResourceType = new BehaviorSubject<ResourceType>(
    ResourceType.People
  );
  readonly currentResourceType$ = this.#currentResourceType.asObservable();

  setResourceType(type: ResourceType) {
    this.#currentResourceType.next(type);
  }

  drawResourcesAndDetermineWinner(): Observable<
    PersonPropertiesTuple | StarshipPropertiesTuple
  > {
    return this.#currentResourceType.value === ResourceType.People
      ? this.#peopleService.getTwoRandomPeople().pipe(
          tap(([personA, personB]) => {
            this.#scoreService.determineWinner(personA.mass, personB.mass);
          })
        )
      : this.#starshipsService.getTwoRandomStarships().pipe(
          tap(([starshipA, starshipB]) => {
            this.#scoreService.determineWinner(starshipA.crew, starshipB.crew);
          })
        );
  }
}
