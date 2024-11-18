import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScoreService, ResourcesFacade } from '../../core';
import {
  PersonProperties,
  ResourceType,
  StarshipProperties,
} from '../../shared';
import { CardComponent } from '../card/card.component';
import { CounterComponent } from '../counter/counter.component';
import { ResourceSwitchComponent } from '../resource-switch/resource-switch.component';
import { AsyncPipe } from '@angular/common';
import { shareReplay } from 'rxjs';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CardComponent,
    CounterComponent,
    ResourceSwitchComponent,
    AsyncPipe,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.sass',
})
export class BoardComponent {
  #scoreService = inject(ScoreService);
  #resourcesService = inject(ResourcesFacade);
  currentWinner$ = this.#scoreService.currentWinner$.pipe(shareReplay());
  resourceType = signal<ResourceType>(ResourceType.People);
  cardLeft = signal<PersonProperties | StarshipProperties | undefined>(
    undefined
  );
  cardRight = signal<PersonProperties | StarshipProperties | undefined>(
    undefined
  );

  drawCards() {
    this.#resourcesService
      .getRandomResources()
      .subscribe(([resource1, resource2]) => {
        this.cardLeft.set(resource1);
        this.cardRight.set(resource2);
      });
  }

  handleResourceTypeChanged(event: ResourceType) {
    this.#resourcesService.setResourceType(event);
  }
}

// logika zmiany resource tutaj czy w dedykowanym kmponencie bez inputuów?
// Ewentualnie wyciągnąć wyłanianie zwycięzcy do fasady
// !!!Zablokować możliwość losowania, nim pobiorą się możliwe uid albo jakoś inaczej to ograć
// Testy
// Zamienić cardA i B na Observable zamiast signalów - do przemyślenia
// zrobić toSignal ewentualnie w card z resourceType i tak ogrywać
// zastosować scan zamiast valueOf ewentualnie
