import { Injectable } from '@angular/core';
import { CrudServiceAbstract, Task, TaskEntity } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends CrudServiceAbstract<Task> {

  constructor() {
    super(TaskEntity);
  }
  
}
