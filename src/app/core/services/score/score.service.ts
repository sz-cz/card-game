import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { parseStrategicProperty } from '../../../shared';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  readonly #currentWinner = new BehaviorSubject<'left' | 'right' | undefined>(
    undefined
  );
  readonly #leftPlayerscore = new BehaviorSubject<number>(0);
  readonly #rightPlayerscore = new BehaviorSubject<number>(0);
  leftPlayerScore$ = this.#leftPlayerscore.asObservable();
  rightPlayerScore$ = this.#rightPlayerscore.asObservable();
  currentWinner$ = this.#currentWinner.asObservable();

  #updateScore(type: 'left' | 'right') {
    if (type === 'left') {
      this.#leftPlayerscore.next(this.#leftPlayerscore.getValue() + 1);
    } else {
      this.#rightPlayerscore.next(this.#rightPlayerscore.getValue() + 1);
    }
  }

  compareStrategicProperty(leftProperty: string, rightProperty: string) {
    const leftCardProperty = parseStrategicProperty(leftProperty);
    const rightCardProperty = parseStrategicProperty(rightProperty);

    if (leftCardProperty > rightCardProperty) {
      this.#updateScore('left');
      this.#currentWinner.next('left');
    } else if (leftCardProperty < rightCardProperty) {
      this.#updateScore('right');
      this.#currentWinner.next('right');
    } else {
      this.#currentWinner.next(undefined);
    }
  }
}
