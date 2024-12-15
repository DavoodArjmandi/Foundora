import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from '../components/role-list.component';


@Component({
  selector: 'fd-role',
  standalone: true,
  imports: [CommonModule, RoleListComponent],
  template: `
  <fd-role-list></fd-role-list>
  `,
  styles: ``,
})
export class RoleComponent {
  
}
