import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormComponent } from './task-form/task-form.component';
import { TasksComponent } from './tasks/tasks.component';

import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo('auth');
const redirectUnauthorizedToMain = () => redirectLoggedInTo('');

const routes: Routes = [
  {
    path: 'form',
    component: TaskFormComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'form/:id',
    component: TaskFormComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: '',
    component: TasksComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
