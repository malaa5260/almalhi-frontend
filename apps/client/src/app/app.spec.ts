import { appRoutes } from './app.routes';

describe('appRoutes', () => {
  it('defines a public about route without an auth guard', () => {
    const aboutRoute = appRoutes.find(route => route.path === 'about');

    expect(aboutRoute).toBeDefined();
    expect(aboutRoute?.loadComponent).toBeDefined();
    expect(aboutRoute?.canActivate).toBeUndefined();
    expect(aboutRoute?.canMatch).toBeUndefined();
    expect(aboutRoute?.canLoad).toBeUndefined();
  });

  it('keeps dashboard route protected while about stays public', () => {
    const aboutRoute = appRoutes.find(route => route.path === 'about');
    const dashboardRoute = appRoutes.find(route => route.path === 'dashboard');

    expect(dashboardRoute?.canActivate).toBeDefined();
    expect(aboutRoute?.canActivate).toBeUndefined();
  });

  it('lazy loads the about component for direct route access', async () => {
    const aboutRoute = appRoutes.find(route => route.path === 'about');

    await expect(aboutRoute?.loadComponent?.()).resolves.toBeDefined();
  });
});
