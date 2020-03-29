import {
  Example1Service,
  CoolCounter,
  ActualService,
} from './example1.service';
import { Component } from '@angular/core';
import { Connect, Effects, Effect, State } from 'ng-effects';

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

  constructor(
    connect: Connect,
    private service: Example1Service,
    private actual: ActualService
  ) {
    connect(this);
  }

  increment() {
    this.service.increment();
  }

  @Effect('thirdCounter')
  init() {
    if (this.actual.value) {
      this.thirdCounter = this.actual.value;
    } else return this.service.data2$;
    // changes(state).subscribe((newState) => {
    //   console.log('newState :', newState);
    //   this.coolCounter = 5;
    // });
  }

  increment2() {
    this.service.data2$.next(this.service.data2$.value + 1);
  }

  @Effect('thirdCounter')
  updateOnChange(state: State<Example1Component>) {
    state.thirdCounter.subscribe((abc) => (this.actual.value = abc));
  }
}
