import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, map, of, switchMap, take, tap } from 'rxjs';
import { CrudPageAbstract, Task, TaskEntity } from 'src/app/models';
import { TaskService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { MatSnackBar } from "@angular/material/snack-bar";
import { InProgressPipe } from 'src/app/shared/pipes';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent extends CrudPageAbstract implements OnInit {
  tasks$ = new BehaviorSubject<Task[]>([]);
  doneList$ = new BehaviorSubject<Task[]>([]);

  constructor(
    router: Router,
    private taskSv: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private inPogressPipe: InProgressPipe,
  ) {
    super(router, TaskEntity);
  }

  ngOnInit() {
    this.taskSv.getAll().pipe(
      take(1),
      tap((task) => this.tasks$.next(task)),
    ).subscribe();
  }

  deleteTask(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this task?',
        confirmColor: 'warn',
      }
    });
    dialogRef.afterClosed().pipe(
      filter((confirm) => confirm),
      switchMap(() => this.taskSv.deleteOne(id)),
      tap(() => {
        const newTasks = this.tasks$.value.filter((task) => task.id !== id);
        this.tasks$.next(newTasks);
      }),
      tap(() => this.snackBar.open('Successfully Deleted', 'Ok', { duration: 5000 })),
      catchError(() => of(alert("Ups! Can't delete"))),
    ).subscribe();
  }

  taskTimerStop(task: Task, currentMs: number) {
    task.msSpent = currentMs;
    this.taskSv.putOne(task.id, task).pipe(
      take(1),
      map(() => this.inPogressPipe.transform(task) ? 'Task progress updated' : 'Task Finished'),
      tap((feedback) => this.snackBar.open(feedback, 'Ok', { duration: 3000 })),
      catchError(() => of(alert("Ups! Can't save time progress"))),
    ).subscribe();
  }

  addToDoneList(task: Task) {
    let doneList = this.doneList$.value.slice();
    doneList = doneList.concat(task);
    this.doneList$.next(doneList);
  }

  inDoneList(task: Task) {
    return !!this.doneList$.value.find(({ id }) => task.id === id);
  }
}
