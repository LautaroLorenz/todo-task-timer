import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, filter, of, switchMap, tap } from 'rxjs';
import { CrudPageAbstract, Task, TaskEntity } from 'src/app/models';
import { TaskService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { MatSnackBar } from "@angular/material/snack-bar";

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
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    super(router, TaskEntity);
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
      tap(() => this.snackBar.open('Successfully Deleted', 'Ok', { duration: 5000 })),
      tap(() => this.tasks$ = this.taskSv.getAll()),
      catchError(() => of(alert("Ups! Can't delete"))),
    ).subscribe();
  }
}
