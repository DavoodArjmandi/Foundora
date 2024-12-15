import { Route } from '@angular/router';
import { UserStore } from '@foundora-ui/data-access/admin';
import { UserComponent } from './pages/user.component';
import { RoleComponent } from './pages/role.component';

export const adminRoutes: Route[] = [
    {
      path: 'User',
      component: UserComponent,
      providers: [UserStore],
    },
    {
      path: 'Role',
      component: RoleComponent,
      //providers: [],
    },
];
