import { Example4Service } from './example4.service';
import { Connect, Effects, HostEmitter } from 'ng-effects';
import { Component } from '@angular/core';

@Component({
  selector: 'app-example4',
  template: `
    <p>
      {{ value }}
    </p>
    <button (click)="click($event)">clickerable</button>
  `,
  providers: [Effects, Example4Service],
})
export class Example4Component {
  value: number = 8;
  click = new HostEmitter<MouseEvent>();
  constructor(connect: Connect) {
    connect(this);
  }
}
