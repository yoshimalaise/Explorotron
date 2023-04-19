import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsFlowchartComponent } from './js-flowchart/js-flowchart.component';



@NgModule({
  declarations: [JsFlowchartComponent],
  imports: [
    CommonModule
  ],
  exports: [JsFlowchartComponent]
})
export class SharedComponentsModule { }
