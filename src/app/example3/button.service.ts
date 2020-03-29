import { increment } from './../ngrx.stuff';
import { Example3Component } from './example3.component';
import { Store, select } from '@ngrx/store';
import { filter, withLatestFrom } from 'rxjs/operators';
import { HostEmitter, State, Effect } from 'ng-effects';
import { ElementRef, Renderer2, Injectable } from '@angular/core';
import { fromEventPattern } from 'rxjs';

export interface ButtonLike {
  disabled: boolean;
  pressed: HostEmitter<MouseEvent>;
}

function registerOnClick(elementRef, renderer) {
  return function (handler) {
    return renderer.listen(elementRef.nativeElement, 'click', handler);
  };
}

@Injectable()
export class Button {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @Effect('pressed')
  handleClick(state: State<ButtonLike>) {
    return fromEventPattern(
      registerOnClick(this.elementRef, this.renderer)
    ).pipe(
      withLatestFrom(state.disabled, (event, disabled) =>
        disabled ? false : event
      ),
      filter(Boolean)
    );
  }
}

@Injectable()
export class CounterEffects {
  constructor(private store: Store<any>) {}

  @Effect()
  clickit(state: State<Example3Component>) {
    return state.click.subscribe(() => this.store.dispatch(increment()));
  }

  @Effect('count')
  setCount() {
    return this.store.pipe(select('count'));
  }
}
