import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Entity } from "../entity/entity.model";
import { PriorityEnum } from "../priority/priority.model";

export const TaskEntity: Entity = {
  singular: 'task',
  plural: 'tasks',
}

export interface Task {
  id: number;
  msStart: number | null; // I assume that in a real scenario it could be different depending on the task
  msLeft: number | null;
  priority: PriorityEnum | null;
  title: string | null;
  description: string | null;
}

export type TaskForm = FormGroup<{
  id: FormControl<number>;
  msStart: FormControl<number | null>;
  msLeft: FormControl<number | null>;
  priority: FormControl<PriorityEnum | null>;
  title: FormControl<string | null>;
  description: FormControl<string | null>;
}>;

export class TaskFormBuilder {
  static readonly START_MS = 180000; // 30 min

  static create(): TaskForm {
    return new FormGroup({
      id: new FormControl(),
      msStart: new FormControl<number | null>(this.START_MS, Validators.required),
      msLeft: new FormControl<number | null>(this.START_MS, Validators.required),
      priority: new FormControl<PriorityEnum | null>(null, Validators.required),
      title: new FormControl<string | null>(null, Validators.required),
      description: new FormControl(),
    });
  }
}
