import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, map, of, switchMap, take, tap } from 'rxjs';
import { PriorityEnum, TaskFormBuilder } from 'src/app/models';
import { TaskService } from 'src/app/services';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  PRIORITY_ENUM = PriorityEnum;
  taskForm = TaskFormBuilder.create();

  get shouldSave() {
    return !this.taskForm.pristine && this.taskForm.valid;
  }

  constructor(
    private route: ActivatedRoute,
    private taskSv: TaskService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      take(1),
      filter(({ id }) => !!Number(id)),
      switchMap(({ id }) => this.taskSv.getOne(id)),
      tap((post) => this.taskForm.setValue(post)),
      catchError(() => of(alert("Ups! Can't get"))),
    ).subscribe();
  }

  canDeactivate() {
    if (!this.shouldSave) {
      return true;
    }
    return this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Do you want to exit?',
        secondMessage: 'Unsaved changes will be lost',
        confirmColor: 'warn',
      }
    }).afterClosed().pipe(
      map((confirm) => !!confirm),
    );
  }

  save() {
    const item = this.taskForm.getRawValue();
    const { id } = item;

    const operation$ = !!Number(id) ?
      this.taskSv.putOne(item.id, item).pipe(
        map(() => 'Successfully Edited'),
      ) :
      this.taskSv.postOne(item).pipe(
        tap(({ id }) => item.id = id),
        map(() => 'Successfully Created'),
      );

    operation$.pipe(
      take(1),
      tap(() => this.taskForm.reset(item)),
      tap((feedback) => this.snackBar.open(feedback, 'Ok', { duration: 5000 })),
      tap(() => this.router.navigate(['task-list'])),
      catchError(() => of(alert("Ups! Can't save"))),
    ).subscribe();
  }
}
