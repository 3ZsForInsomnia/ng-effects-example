import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="App">
      <div class="App__links">
        <a
          [routerLink]="['/']"
          class="Link"
          routerLinkActive="Active"
          [routerLinkActiveOptions]="{ exact: true }"
          >Home</a
        >
        <a [routerLink]="['/example1']" class="Link" routerLinkActive="Active"
          >Example 1</a
        >
        <a [routerLink]="['/example2']" class="Link" routerLinkActive="Active"
          >Example 2</a
        >
        <a [routerLink]="['/example3']" class="Link" routerLinkActive="Active"
          >Example 3</a
        >
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    '.App { margin: 1rem }',
    '.App__links { display: flex; };',
    '.Link { padding: 1rem; }',
    '.Active { font-weight: bold;}',
  ],
})
export class AppComponent {
  title = 'ng-effects-example';
}
