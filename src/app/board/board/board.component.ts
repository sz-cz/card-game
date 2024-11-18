import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScoreService, ResourcesFacade } from '../../core';
import { PersonProperties, StarshipProperties, UI_TEXTS } from '../../shared';
import { CardComponent } from '../card/card.component';
import { CounterComponent } from '../counter/counter.component';
import { ResourceSwitchComponent } from '../resource-switch/resource-switch.component';
import { AsyncPipe } from '@angular/common';
import { shareReplay, take } from 'rxjs';

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
  #resourcesFacade = inject(ResourcesFacade);
  currentWinner$ = this.#scoreService.currentWinner$.pipe(shareReplay());
  cardLeft = signal<PersonProperties | StarshipProperties | undefined>(
    undefined
  );
  cardRight = signal<PersonProperties | StarshipProperties | undefined>(
    undefined
  );
  uiTexts = UI_TEXTS;

  drawCards() {
    this.#resourcesFacade
      .drawResourcesAndDetermineWinner()
      .pipe(take(1))
      .subscribe(([resource1, resource2]) => {
        this.cardLeft.set(resource1);
        this.cardRight.set(resource2);
      });
  }
}
