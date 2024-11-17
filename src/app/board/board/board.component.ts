import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  PeopleService,
  StarshipsService,
  ScoreService,
  ResourcesService,
} from '../../core';
import { PersonProperties, ResourceType } from '../../shared';
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
  #peopleService = inject(PeopleService);
  #starshipsService = inject(StarshipsService);
  #scoreService = inject(ScoreService);
  #resourcesService = inject(ResourcesService);

  cardLeft = signal<PersonProperties | undefined>(undefined);
  cardRight = signal<PersonProperties | undefined>(undefined);
  currentWinner$ = this.#scoreService.currentWinner$.pipe(shareReplay());
  resourceType = signal<ResourceType>(ResourceType.People);

  drawCards() {
    this.#peopleService.getRandomPeople().subscribe(([person1, person2]) => {
      this.cardLeft.set(person1);
      this.cardRight.set(person2);
    });
  }

  handleResourceTypeChanged(event: ResourceType) {
    console.log('CHANGE', event);
  }
}

// logika zmiany resource tutaj czy w dedykowanym kmponencie bez inputuów?
// Ogarnąć zmienianie resourców (osobne karty?, fasada na serwisy różne?)
// Zablokować możliwość losowania, nim pobiorą się możliwe uid albo jakoś inaczej to ograć
// Testy
// Zamienić cardA i B na Observable zamiast signalów
// zastosować scan zamiast valueOf ewentualnie
