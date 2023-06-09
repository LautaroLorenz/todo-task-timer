import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  RowWithActionsComponent,
  TimeCounterComponent
} from './components';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MsToMinPipe, PriorityPipe } from './pipes';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

const commons = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
];
const pipes = [
  MsToMinPipe,
  PriorityPipe,
];
const components = [
  RowWithActionsComponent,
  ConfirmDialogComponent,
  TimeCounterComponent,
];
const material = [
  MatCardModule,
  MatListModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatRippleModule,
  MatSnackBarModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatGridListModule,
  MatSelectModule,
  MatProgressBarModule,
  MatChipsModule,
  MatProgressSpinnerModule,
];

@NgModule({
  imports: [
    ...commons,
    ...material,
  ],
  declarations: [
    ...pipes,
    ...components,
  ],
  exports: [
    ...commons,
    ...pipes,
    ...material,
    ...components,
  ],
  providers: [
    ...pipes,
  ]
})
export class SharedModule { }
