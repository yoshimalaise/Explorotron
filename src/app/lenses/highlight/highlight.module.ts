import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightComponent } from './highlight.component';
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
  declarations: [HighlightComponent],
  exports: [HighlightComponent]
})
export class HighlightModule { }