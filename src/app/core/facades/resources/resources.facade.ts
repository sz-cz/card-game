import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  PersonPropertiesTuple,
  ResourceType,
  StarshipPropertiesTuple,
} from '../../../shared';
import { PeopleService, StarshipsService } from '../..';

@Injectable({
  providedIn: 'root',
})
export class ResourcesFacade {
  #peopleService = inject(PeopleService);
  #starshipsService = inject(StarshipsService);

  readonly #currentResourceType = new BehaviorSubject<ResourceType>(
    ResourceType.People
  );
  readonly currentResourceType$ = this.#currentResourceType.asObservable();

  setResourceType(type: ResourceType) {
    this.#currentResourceType.next(type);
  }

  getRandomResources(): Observable<
    PersonPropertiesTuple | StarshipPropertiesTuple
  > {
    return this.#currentResourceType.value === ResourceType.People
      ? this.#peopleService.getRandomPeople()
      : this.#starshipsService.getRandomStarships();
  }
}
