import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScoreService, ResourcesFacade } from '../../core';
import { PersonProperties, StarshipProperties, UI_TEXTS } from '../../shared';
import { CardComponent } from '../card/card.component';
import { CounterComponent } from '../counter/counter.component';
import { ResourceSwitchComponent } from '../resource-switch/resource-switch.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CardComponent,
    CounterComponent,
    ResourceSwitchComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.sass',
})
export class BoardComponent {
  #scoreService = inject(ScoreService);
  #resourcesFacade = inject(ResourcesFacade);
  currentWinner = toSignal(this.#scoreService.currentWinner$);
  cardLeftData = signal<PersonProperties | StarshipProperties | undefined>(
    undefined
  );
  cardRightData = signal<PersonProperties | StarshipProperties | undefined>(
    undefined
  );
  uiTexts = UI_TEXTS;

  drawCards() {
    this.#resourcesFacade
      .drawResourcesAndDetermineWinner()
      .pipe(take(1))
      .subscribe(([resource1, resource2]) => {
        this.cardLeftData.set(resource1);
        this.cardRightData.set(resource2);
      });
  }
}
