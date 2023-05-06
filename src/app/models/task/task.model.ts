import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Entity } from "../entity/entity.model";
import { Priority } from "../priority/priority.model";

export const TaskEntity: Entity = {
  singular: 'task',
  plural: 'tasks',
}

export interface Task {
  id: number;
  msStart: number; // I assume that in a real scenario it could be different from 30 depending on the task
  msLeft: number;
  priority: Priority;
  title: string | null;
  description: string | null;
}

export type TaskForm = FormGroup<{
  id: FormControl<number>;
  msStart: FormControl<number>;
  msLeft: FormControl<number>;
  priority: FormControl<Priority>;
  title: FormControl<string | null>;
  description: FormControl<string | null>;
}>;

export class TaskFormBuilder {
  static create(): TaskForm {
    return new FormGroup({
      id: new FormControl(),
      msStart: new FormControl(),
      msLeft: new FormControl(),
      priority: new FormControl(),
      title: new FormControl<string | null>(null, Validators.required),
      description: new FormControl(),
    });
  }
}
