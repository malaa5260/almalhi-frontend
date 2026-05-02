import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@almalhi-frontend/auth').then(m => m.AUTH_ROUTES),
  },
  { path: '**', redirectTo: '', },
];
