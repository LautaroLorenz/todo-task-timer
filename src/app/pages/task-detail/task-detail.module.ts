import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskDetailRoutingModule } from './task-detail-routing.module';
import { TaskDetailComponent } from './task-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TaskDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TaskDetailRoutingModule
  ]
})
export class TaskDetailModule { }
