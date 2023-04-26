import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraceLensComponent } from './components/trace-lens/trace-lens.component';



@NgModule({
  declarations: [
    TraceLensComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TraceLensComponent
  ]
})
export class TraceModule { }
