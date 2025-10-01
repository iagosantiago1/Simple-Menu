import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Main } from './pages/main/main';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },

  {
    path: '',
    component: Main,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then((c) => c.Dashboard)
      },

      {
        path: 'users',
        loadComponent: () => import('./pages/users/users').then((c) => c.Users)
      },

      {
        path: 'about-us',
        loadComponent: () => import('./pages/about-us/about-us').then((c) => c.AboutUs)
      },

      {
        path: 'list',
        loadComponent: () => import('./associate/list/list').then((c) => c.List)
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
