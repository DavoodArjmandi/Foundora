import { Route } from '@angular/router';
import { UserStore } from '@foundora-ui/data-access/admin';

export const appRoutes: Route[] = [
    {
      path: '',
      loadChildren: () => import('@foundora-ui/admin-ui').then((m) => m.adminRoutes),
      providers: [UserStore],
    },
    {
      path: 'auth',
      loadChildren: () => import('@foundora-ui/auth-ui').then((m) => m.authRoutes),
      providers: [],
    },
];
