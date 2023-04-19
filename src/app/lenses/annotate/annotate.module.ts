import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnotateComponent } from './annotate.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatButtonModule,
    FormsModule
  ],
  declarations: [AnnotateComponent],
  exports: [AnnotateComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AnnotateModule { }