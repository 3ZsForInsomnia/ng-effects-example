import { take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, State } from 'ng-effects';
import { BehaviorSubject } from 'rxjs';
import { Example4Component } from './example4.component';

/**
 * This example is basically useState/useEffect
 */

@Injectable()
export class Example4Service {
  constructor(private state: State2) {}

  @Effect()
  init(state: State<Example4Component>) {
    return state.value.pipe(
      take(1),
      tap(
        (value) =>
          (this.state.values[this.state.values.length] = new BehaviorSubject<
            number
          >(value))
      )
    );
  }

  @Effect('value')
  bind() {
    return this.state.values[this.state.values.length - 1];
  }

  @Effect()
  handleClick(state: State<Example4Component>) {
    return state.click.subscribe(() => {
      this.state.values.forEach((sub, index) =>
        console.log(`sub.value at ${index} : ${sub.value}`)
      );
      this.state.values[this.state.values.length - 1].next(
        this.state.values[this.state.values.length - 1].value + 1
      );
    });
  }
}

@Injectable()
export class State2 {
  values: Array<BehaviorSubject<number>> = [];
}
