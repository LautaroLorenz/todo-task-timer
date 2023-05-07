import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, catchError, debounceTime, filter, map, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { CrudPageAbstract, Task, TaskEntity } from 'src/app/models';
import { TaskService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent extends CrudPageAbstract implements OnInit, OnDestroy {
  tasks$ = new BehaviorSubject<Task[]>([]);
  runningList$ = new BehaviorSubject<Task[]>([]);
  filterList$ = new BehaviorSubject<Task[]>([]);
  search = new FormControl();

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    router: Router,
    private taskSv: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    super(router, TaskEntity);
  }

  ngOnInit() {
    this.taskSv.getAll().pipe(
      take(1),
      tap((task) => this.tasks$.next(task)),
    ).subscribe();
    this.search.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      debounceTime(350),
      tap((text) => this.filterList(text)),
    ).subscribe();
  }

  canDeactivate() {
    if (this.runningList$.value.length === 0) {
      return true;
    }
    return this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Do you want to exit?',
        secondMessage: 'There are task in progress',
        confirmColor: 'warn',
      }
    }).afterClosed().pipe(
      map((confirm) => !!confirm),
    );
  }

  filterList(text: string) {
    const toSearch = text.toLowerCase();
    const filtered = this.tasks$.value.filter((task) => {
      return `${task.title?.toLowerCase()}${task.description?.toLowerCase()}`.includes(toSearch);
    });
    this.filterList$.next(filtered);
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
      map(() => this.isDone(task) ? 'Task Finished' : 'Task progress updated'),
      tap((feedback) => this.snackBar.open(feedback, 'Ok', { duration: 3000 })),
      catchError(() => of(alert("Ups! Can't save time progress"))),
    ).subscribe();
  }

  isDone(task: Task) {
    if (!task.msToSpent) {
      return true;
    }
    if (!task.msSpent) {
      return false;
    }
    return task.msSpent >= task.msToSpent;
  }

  addTaskToRunningList(running: boolean, task: Task) {
    let runningList = this.runningList$.value.slice();
    if (running) {
      runningList = runningList.concat(task);
    } else {
      runningList = runningList.filter(({ id }) => task.id !== id);
    }
    this.runningList$.next(runningList);
  }

  isFiltered(task: Task): boolean {
    return this.filterList$.value.some(({ id }) => task.id === id);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
