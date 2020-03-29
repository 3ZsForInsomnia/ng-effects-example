import { Button } from './button.service';
import { increment } from './../ngrx.stuff';
import { Component } from '@angular/core';
import { Effect, Connect, Effects, HostEmitter } from 'ng-effects';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-example2',
  template: `
    <div>
      <p>{{ count }}</p>
      <button ngfx-button [disabled]="false" (pressed)="increment($event)">
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
    console.log('wtf');
    this.store.dispatch(increment());
  }

  @Effect('count')
  setCount() {
    return this.store.pipe(select('count'));
  }
}
