import { CounterEffects } from './button.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Connect, Effects, HostEmitter } from 'ng-effects';

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
  providers: [Effects, CounterEffects],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example3Component {
  count: number = 0;
  disabled = false;
  click = new HostEmitter<MouseEvent>();

  constructor(connect: Connect) {
    connect(this);
  }
}
