import { Route } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';

export const authRoutes: Route[] = [
    {
      path: 'login',
      component: LoginComponent,
      providers: [],
    },
    {
      path: 'register',
      component: RegisterComponent,
      providers: [],
    }
];
