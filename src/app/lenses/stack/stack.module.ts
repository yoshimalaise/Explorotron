import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackLensComponent } from './components/stack-lens/stack-lens.component';



@NgModule({
  declarations: [
    StackLensComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StackLensComponent
  ]
})
export class StackModule { }
