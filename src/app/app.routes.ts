import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guard/auth-guard.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: '/bank/list',
    pathMatch: 'full',
  },
  {
    path: 'bank',
    data: { breadcrumb: 'bank' },
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
          import('./bank/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        data: { breadcrumb: 'Detalhes' },
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./bank/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        data: { breadcrumb: 'Cadastrar Banco' },
      },
    ],
  },
];
