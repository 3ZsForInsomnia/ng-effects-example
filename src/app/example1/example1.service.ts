import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { interval, Observable, BehaviorSubject, of } from 'rxjs';
import { Effect, changes } from 'ng-effects';

@Injectable()
export class Example1Service {
  data$: Observable<number>;
  data1$: BehaviorSubject<number>;
  data2$: BehaviorSubject<number>;
  constructor() {
    this.data$ = interval(1000).pipe(map((newNumber) => newNumber));
    this.data1$ = new BehaviorSubject<number>(0);
    this.data2$ = new BehaviorSubject<number>(0);
  }

  @Effect('count') // binds the returned `thing` to `count`
  incrementCount() {
    // return an observable that will update `count`
    return this.data$;
  }

  // whenRendered: false lets it update after init, so it doesn't change while rendering
  @Effect('secondCounter')
  increment() {
    this.data1$.next(this.data1$.value + 1);
    return this.data1$;
  }
}

@Injectable()
export class CoolCounter {
  @Effect('coolCounter')
  updateCoolCounter(state) {
    console.log('state :', state);
    return of(2);
  }
}

@Injectable()
export class ActualService {
  value = 0;
}
