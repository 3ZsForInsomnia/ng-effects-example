import { Example1Component } from './example1.component';
import { map, pairwise } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { interval, Observable, BehaviorSubject, of, from } from 'rxjs';
import { Effect, State } from 'ng-effects';

@Injectable()
export class Example1Service {
  data$: Observable<number>;
  data1$: BehaviorSubject<number>;
  data2$: BehaviorSubject<number>;
  constructor(private actual: ActualService) {
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

  /**
   * here through update on change basically recreates react state hook
   *
   * init starts us up with existing state
   *
   * increment2 is setState
   *
   * updateOnChange handles saving state so it can be retrieved across renders
   *
   * useEffect is basically @Effect
   *
   * All of this is reusable as well
   */
  @Effect('thirdCounter')
  init() {
    this.data2$ = new BehaviorSubject(this.actual.value || 0);
    return this.data2$;
  }

  increment2() {
    this.data2$.next(this.data2$.value + 1);
  }

  // this totally replaces ngOnChanges, but can operate on whole state, parts of state, whatever
  @Effect()
  updateOnChange(state: State<Example1Component>) {
    // watch changes to values
    from(state.thirdCounter)
      .pipe(pairwise()) // creates tuple of old state, new state
      .subscribe((newState) => {
        console.log('newState :', newState);
        this.actual.value = newState[1];
      });
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
