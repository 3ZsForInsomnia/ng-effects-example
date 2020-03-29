import { HostEmitter } from 'ng-effects';
import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `<button (click)="pressed.emit()" [disabled]="disabled">
    {{ text }}
  </button>`,
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() text = '';

  @Output() pressed = new HostEmitter<any>();
}
