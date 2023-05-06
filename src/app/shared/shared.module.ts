import { NgModule } from '@angular/core';
// import { BoxComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    // BoxComponent,
  ],
  exports: [
    // BoxComponent,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }