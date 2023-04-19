import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowChartLensComponent } from './flow-chart-lens/flow-chart-lens.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';



@NgModule({
  declarations: [
    FlowChartLensComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule
  ],
  exports: [FlowChartLensComponent]
})
export class FlowchartModule { }
