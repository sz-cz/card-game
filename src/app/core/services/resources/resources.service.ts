import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResourceType } from '../../../shared';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  readonly #currentResourceType = new BehaviorSubject<ResourceType>(
    ResourceType.People
  );
  readonly currentResourceType$ = this.#currentResourceType.asObservable();

  setResourceType(type: ResourceType) {
    this.#currentResourceType.next(type);
  }
}
