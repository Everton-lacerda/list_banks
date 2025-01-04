import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/bank/list', pathMatch: 'full', data: { breadcrumb: 'Home' } },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
    data: { breadcrumb: 'Login' },
  },
  {
    path: 'bank',
    data: { breadcrumb: 'Bank' },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        loadComponent: () =>
          import('./bank/list/list.component').then((m) => m.ListComponent),
        data: { breadcrumb: 'Lista de Bancos' },
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./bank/edit/edit.component').then((m) => m.EditComponent),
        data: { breadcrumb: 'Detalhes' },
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./bank/register/register.component').then((m) => m.RegisterComponent),
        data: { breadcrumb: 'Cadastrar Banco' },
      },
    ],
  },
];
