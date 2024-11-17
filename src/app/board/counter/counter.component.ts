import { Component, inject } from '@angular/core';
import { ScoreService } from '../../core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.sass',
})
export class CounterComponent {
  #scoreService = inject(ScoreService);

  playerLeftWinCount$ = this.#scoreService.leftPlayerScore$;
  playerRightWinCount$ = this.#scoreService.rightPlayerScore$;
}
