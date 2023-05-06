import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/models';

@Pipe({
  name: 'inProgress',
})
export class InProgressPipe implements PipeTransform {
  transform(task: Task): any {
    if (!task.msSpent) {
      return true;
    }
    if (!task.msToSpent) {
      return false;
    }
    return task.msSpent < task.msToSpent;
  }
}
