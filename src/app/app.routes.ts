import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guard/auth-guard.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/bank/list',
    pathMatch: 'full',
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'bank',
    data: { breadcrumb: 'bancos' },
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        loadComponent: () =>
          import('./bank/list/list.component').then((m) => m.ListComponent),
        data: { breadcrumb: 'Cadastro de Bancos' },
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
          import('./bank/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        data: { breadcrumb: 'Cadastrar Banco' },
      }
    ],
  },
];
