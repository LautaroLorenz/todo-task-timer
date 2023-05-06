import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, of, switchMap, take, tap } from 'rxjs';
import { TaskFormBuilder } from 'src/app/models';
import { TaskService } from 'src/app/services';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  taskForm = TaskFormBuilder.create();

  get shouldSave() {
    return this.taskForm.pristine || this.taskForm.invalid;
  }

  constructor(
    private route: ActivatedRoute,
    private taskSv: TaskService,
    private router: Router,
  ) { }

  private reloadPage(id: number) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['task-detail', id]);
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      take(1),
      filter(({ id }) => !!Number(id)),
      switchMap(({ id }) => this.taskSv.getOne(id)),
      tap((post) => this.taskForm.setValue(post)),
      catchError(() => of(alert("Ups! Can't get"))),
    ).subscribe();
  }

  save() {
    const item = this.taskForm.getRawValue();
    const { id } = item;
    const operation$ = !!Number(id) ?
      this.taskSv.putOne(item.id, item).pipe(
        tap(() => alert('Edited')),
      ) :
      this.taskSv.postOne(item).pipe(
        tap(() => alert('Created')),
      );

    operation$.pipe(
      take(1),
      tap(({ id }) => this.reloadPage(id)),
      catchError(() => of(alert("Ups! Can't save"))),
    ).subscribe();
  }
}
