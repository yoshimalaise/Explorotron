import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArgumentPickerLensComponent } from './components/argument-picker-lens/argument-picker-lens.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    ArgumentPickerLensComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  exports: [
    ArgumentPickerLensComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ArgumentPickerModule { }
