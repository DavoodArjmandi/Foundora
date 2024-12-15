import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../components/user-list.component';

@Component({
  selector: 'fd-user',
  standalone: true,
  imports: [CommonModule, UserListComponent],
  template: `
  <fd-user-list></fd-user-list>
  `,
  styles: ``,
})
export class UserComponent {
  
}
