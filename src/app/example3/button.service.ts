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
