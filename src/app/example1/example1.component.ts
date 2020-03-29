import { Example1Service, CoolCounter } from './example1.service';
import { Component } from '@angular/core';
import { Connect, Effects } from 'ng-effects';

@Component({
  selector: 'app-example1',
  template: `
    <div>
      <p>
        {{ count }}
      </p>
      <div>
        <button (click)="increment()">click me for fun</button>
        <p>{{ secondCounter }}</p>
      </div>
      <div>
        <button (click)="increment2()">click me for fun</button>
        <p>{{ thirdCounter }}</p>
      </div>
      <div>
        <p>Cool! {{ coolCounter }}</p>
      </div>
    </div>
  `,
  providers: [Effects, Example1Service, CoolCounter],
})
export class Example1Component {
  count = 0;
  secondCounter = 0;
  thirdCounter = 0;
  coolCounter = 0;

  constructor(connect: Connect, private service: Example1Service) {
    connect(this);
  }

  increment() {
    this.service.increment();
  }

  increment2() {
    this.service.increment2();
  }
}
