import { Component } from '@angular/core';
import { AppLayoutComponent } from './app-layout.component';

@Component({
  imports: [AppLayoutComponent],
  selector: 'app-root',
  template: `
    <app-layout/>
  `
})
export class AppComponent {
  title = 'Admin';
}
