import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CrudPageAbstract, Task, TaskEntity } from 'src/app/models';
import { TaskService } from 'src/app/services';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent extends CrudPageAbstract {
  tasks$: Observable<Task[]> = this.taskSv.getAll();

  constructor(
    router: Router,
    private taskSv: TaskService,
  ) {
    super(router, TaskEntity);
  }
}
