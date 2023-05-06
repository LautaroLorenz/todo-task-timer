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
import { InProgressPipe, MsToMinPipe, PriorityPipe } from './pipes';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const pipes = [

];
const components = [

];
const material = [

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
  ],
  declarations: [
    RowWithActionsComponent,
    ConfirmDialogComponent,
    PriorityPipe,
    InProgressPipe,
    MsToMinPipe,
    TimeCounterComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatRippleModule,
    MatSnackBarModule,
    RowWithActionsComponent,
    MatDialogModule,
    ConfirmDialogComponent,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    PriorityPipe,
    InProgressPipe,
    MsToMinPipe,
    MatProgressBarModule,
    MatChipsModule,
    TimeCounterComponent,
    MatProgressSpinnerModule,
  ],
  providers: [
    MsToMinPipe,
    PriorityPipe,
    InProgressPipe,
  ]
})
export class SharedModule { }
