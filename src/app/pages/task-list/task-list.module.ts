import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListRoutingModule } from './task-list-routing.module';
import { TaskListComponent } from './task-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TaskListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TaskListRoutingModule
  ]
})
export class TaskListModule { }
