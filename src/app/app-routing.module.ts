import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'task-list',
    loadChildren: () => import('./pages/task-list/task-list.module').then(m => m.TaskListModule),
    title: 'Task List',
  },
  {
    path: 'task-detail',
    loadChildren: () => import('./pages/task-detail/task-detail.module').then(m => m.TaskDetailModule),
    title: 'Task Create',
  },
  {
    path: 'task-detail/:id',
    loadChildren: () => import('./pages/task-detail/task-detail.module').then(m => m.TaskDetailModule),
    title: 'Task Edit',
  },
  {
    path: '**',
    redirectTo: 'task-list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
