import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { parseMass } from '../../../shared';

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

  compareMass(leftMass: string, rightMass: string) {
    const leftCardMass = parseMass(leftMass);
    const rightCardMass = parseMass(rightMass);

    if (leftCardMass > rightCardMass) {
      this.#updateScore('left');
      this.#currentWinner.next('left');
    } else if (leftCardMass < rightCardMass) {
      this.#updateScore('right');
      this.#currentWinner.next('right');
    } else {
      this.#currentWinner.next(undefined);
    }
  }
}
