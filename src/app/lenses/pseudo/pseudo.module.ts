import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PseudoLenseComponent } from './components/pseudo-lense/pseudo-lense.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    PseudoLenseComponent
  ],
  exports: [
    PseudoLenseComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class PseudoModule { }
