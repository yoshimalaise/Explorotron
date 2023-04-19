import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickflowChartLensComponent } from './components/pickflow-chart-lens/pickflow-chart-lens.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    PickflowChartLensComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    MatTabsModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  exports: [
    PickflowChartLensComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class PickFlowchartModule { }
