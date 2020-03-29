import { increment } from './../ngrx.stuff';
import { Component } from '@angular/core';
import { Effect, Connect, Effects, changes, State } from 'ng-effects';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-example2',
  template: `
    <div>
      <p>{{ count }}</p>
      <button (click)="increment($event)">
        click to increment count!
      </button>
      <div>
        <p>{{ anotherNumber }}</p>
      </div>
    </div>
  `,
  providers: [Effects],
})
export class Example2Component {
  count: number = 0;
  anotherNumber = 5;

  constructor(private store: Store<{ count: number }>, connect: Connect) {
    connect(this);
  }

  @Effect()
  increment() {
    this.store.dispatch(increment());
  }

  @Effect('count')
  setCount(state: State<Example2Component>) {
    // so much nicer than ngOnChanges, it's an observable
    changes(state)
      .pipe(take(1))
      .subscribe(
        (newState) => (this.anotherNumber = newState.anotherNumber + 1)
      );
    return this.store.pipe(select('count'));
  }
}
