import { Button, ButtonLike } from './button.service';
import { Component, Input, Output } from '@angular/core';
import { HostEmitter, Connect, Effects } from 'ng-effects';

@Component({
  selector: 'button[ngfx-button]',
  providers: [Effects, Button],
})
export class ButtonComponent implements ButtonLike {
  @Input() disabled = false;

  @Output() pressed = new HostEmitter<MouseEvent>();

  constructor(connect: Connect) {
    connect(this);
  }
}
