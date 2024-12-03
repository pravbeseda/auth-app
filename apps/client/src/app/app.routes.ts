import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'sign-in',
        loadComponent: () =>
            import('./pages/sign-in/sign-in.component').then(m => m.SignInComponent),
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./pages/register/register.component').then(m => m.RegisterComponent),
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
];
