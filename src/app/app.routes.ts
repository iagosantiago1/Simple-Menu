import { Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { Dashboard } from './pages/dashboard/dashboard';
import { Users } from './pages/users/users';
import { AboutUs } from './pages/about-us/about-us';

export const routes: Routes = [
    {
      path: 'main',
      component: Main
    },

    {
      path: 'dashboard',
      component: Dashboard
    },

    {
      path: 'users',
      component: Users
    },

    {
      path: 'about-us',
      component: AboutUs
    },
];
