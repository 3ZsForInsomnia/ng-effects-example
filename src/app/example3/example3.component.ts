import { increment } from './../ngrx.stuff';
import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
} from '@angular/core';
import { Effect, Connect, Effects, State, HostEmitter } from 'ng-effects';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-example3',
  template: `
    <div>
      <p>{{ count }}</p>
      <app-button
        [text]="'click to increment count!'"
        [disabled]="false"
        (pressed)="click($event)"
      >
      </app-button>
    </div>
  `,
  providers: [Effects],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example3Component {
  count: number = 0;
  disabled = false;
  click = new HostEmitter<MouseEvent>();
  clickered = new EventEmitter();

  constructor(private store: Store<{ count: number }>, connect: Connect) {
    connect(this);
  }

  @Effect()
  clickit(state: State<Example3Component>) {
    return state.click.subscribe(() => this.store.dispatch(increment()));
  }

  @Effect('count')
  setCount() {
    return this.store.pipe(select('count'));
  }
}
