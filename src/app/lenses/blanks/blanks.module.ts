import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlanksLensComponent } from './components/blanks-lens/blanks-lens.component';



@NgModule({
  declarations: [
    BlanksLensComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BlanksLensComponent
  ]
})
export class BlanksModule { }
