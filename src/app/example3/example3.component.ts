import { Button } from './button.service';
import { increment } from './../ngrx.stuff';
import { Component } from '@angular/core';
import { Effect, Connect, Effects, HostEmitter } from 'ng-effects';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-example3',
  template: `
    <div>
      <p>{{ count }}</p>
      <button ngfx-button [disabled]="false" (pressed)="buttonPressed()">
        click to increment count!
      </button>
    </div>
  `,
  providers: [Effects, Button],
})
export class Example3Component {
  count: number = 0;
  disabled = false;
  pressed = new HostEmitter<MouseEvent>();

  constructor(private store: Store<{ count: number }>, connect: Connect) {
    connect(this);
  }

  increment() {
    console.log('dub tee eff');
    this.store.dispatch(increment());
  }

  @Effect('count')
  setCount() {
    return this.store.pipe(select('count'));
  }
}
