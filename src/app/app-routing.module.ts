import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    redirectTo: 'task-list',
  },
  {
    path: 'task-list',
    loadChildren: () => import('./pages/task-list/task-list.module').then(m => m.TaskListModule),
    title: 'Task List',
  },
  {
    path: 'task-detail',
    loadChildren: () => import('./pages/task-detail/task-detail.module').then(m => m.TaskDetailModule),
    title: 'Task Detail Create',
  },
  {
    path: 'task-detail/:id',
    loadChildren: () => import('./pages/task-detail/task-detail.module').then(m => m.TaskDetailModule),
    title: 'Task Detail Edit',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
