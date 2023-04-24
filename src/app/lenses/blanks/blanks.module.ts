import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlanksLensComponent } from './components/blanks-lens/blanks-lens.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { BlanksConfigComponent } from './components/blanks-config/blanks-config.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    BlanksLensComponent,
    BlanksConfigComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule,
    MatCardModule,
    MatFormFieldModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  exports: [
    BlanksLensComponent
  ]
})
export class BlanksModule { }
