import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParsonsLensComponent } from './components/parsons-lens/parsons-lens.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    ParsonsLensComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    ParsonsLensComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ParsonsModule { }
