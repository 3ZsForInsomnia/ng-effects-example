import { Button, ButtonLike } from './button.service';
import { Component, Input, Output } from '@angular/core';
import { HostEmitter, Connect, Effects, Effect, State } from 'ng-effects';

@Component({
  selector: 'button[ngfx-button]',
  providers: [Effects, Button],
})
export class ButtonComponent implements ButtonLike {
  @Input() disabled = false;

  @Output() pressed = new HostEmitter<MouseEvent>(true);

  constructor(connect: Connect) {
    console.log('instantiate the button');
    connect(this);
  }

  @Effect('pressed')
  emitPressed(state: State<ButtonComponent>) {
    return state.pressed;
  }
}
