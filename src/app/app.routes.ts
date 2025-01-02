import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule) // Lazy loading
    },
    {
        path: 'trello',
        loadChildren: () => import('./modules/trello/trello.module').then(mod => mod.TrelloModule) // Lazy loading
    }
];
