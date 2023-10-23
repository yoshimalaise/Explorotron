import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParsonsLensComponent } from './components/parsons-lens/parsons-lens.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { ParsonsJSLensComponent } from './components/parsons-jslens/parsons-jslens.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ParsonsLensComponent,
    ParsonsJSLensComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    ParsonsLensComponent,
    ParsonsJSLensComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ParsonsModule { }
