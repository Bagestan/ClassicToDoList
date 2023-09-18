import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksModule } from './tasks/tasks.module';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { AuthModule } from './auth/auth.module';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo('auth');
const redirectUnauthorizedToMain = () => redirectLoggedInTo('');

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module').then(() => TasksModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(() => AuthModule),
    ...canActivate(redirectUnauthorizedToMain),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
