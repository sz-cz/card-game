import { TestBed } from '@angular/core/testing';
import { ScoreService } from './score.service';

describe('ScoreService', () => {
  let service: ScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize scores and winner as undefined', (done) => {
    service.leftPlayerScore$.subscribe((score) => {
      expect(score).toBe(0);
    });

    service.rightPlayerScore$.subscribe((score) => {
      expect(score).toBe(0);
    });

    service.currentWinner$.subscribe((winner) => {
      expect(winner).toBeUndefined();
      done();
    });
  });

  it('should update left score and set winner to left when left mass is greater', (done) => {
    service.determineWinner('80', '60');

    service.leftPlayerScore$.subscribe((score) => {
      expect(score).toBe(1);
    });

    service.rightPlayerScore$.subscribe((score) => {
      expect(score).toBe(0);
    });

    service.currentWinner$.subscribe((winner) => {
      expect(winner).toBe('left');
      done();
    });
  });

  it('should update right score and set winner to right when right mass is greater', (done) => {
    service.determineWinner('50', '70');

    service.leftPlayerScore$.subscribe((score) => {
      expect(score).toBe(0);
    });

    service.rightPlayerScore$.subscribe((score) => {
      expect(score).toBe(1);
    });

    service.currentWinner$.subscribe((winner) => {
      expect(winner).toBe('right');
      done();
    });
  });

  it('should not update scores and set winner to undefined when masses are equal', (done) => {
    service.determineWinner('60', '60');

    service.leftPlayerScore$.subscribe((score) => {
      expect(score).toBe(0);
    });

    service.rightPlayerScore$.subscribe((score) => {
      expect(score).toBe(0);
    });

    service.currentWinner$.subscribe((winner) => {
      expect(winner).toBeUndefined();
      done();
    });
  });

  it('should parse unknown as 0', (done) => {
    service.determineWinner('1', 'unknown');

    service.leftPlayerScore$.subscribe((score) => {
      expect(score).toBe(1);
    });

    service.rightPlayerScore$.subscribe((score) => {
      expect(score).toBe(0);
    });

    service.currentWinner$.subscribe((winner) => {
      expect(winner).toBe('left');
      done();
    });
  });

  it('should not update scores and set winner to undefined when both masses are unknown', (done) => {
    service.determineWinner('unknown', 'unknown');

    service.leftPlayerScore$.subscribe((score) => {
      expect(score).toBe(0);
    });

    service.rightPlayerScore$.subscribe((score) => {
      expect(score).toBe(0);
    });

    service.currentWinner$.subscribe((winner) => {
      expect(winner).toBeUndefined();
      done();
    });
  });

  it('should parse strings with comma and compare masses', (done) => {
    service.determineWinner('1,123', '1122');

    service.leftPlayerScore$.subscribe((score) => {
      expect(score).toBe(1);
    });

    service.rightPlayerScore$.subscribe((score) => {
      expect(score).toBe(0);
    });

    service.currentWinner$.subscribe((winner) => {
      expect(winner).toBe('left');
      done();
    });
  });
});
