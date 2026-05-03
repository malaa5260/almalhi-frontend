import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register').then(m => m.Register),
  },
  {
    path: 'forgot-password',
    loadComponent() {
      return import('./pages/forgot-password/forgot-password').then(m => m.ForgotPassword);
    },
  },
  {
    path: 'otp',
    loadComponent() {
      return import('./pages/otp-verification/otp-verification').then(m => m.OtpVerification);
    }
  },
  {
    path: 'reset-password',
    loadComponent() {
      return import('./pages/reset-password/reset-password').then(m => m.ResetPassword);
    }
  }
];
