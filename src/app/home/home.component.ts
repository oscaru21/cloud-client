import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DashboardComponent],
  template: `
    <app-dashboard class="w-full h-full mx-auto"></app-dashboard>
  `,
  styles: `
   :host(app-home) { width:100% }
 `
})
export class HomeComponent {

}
