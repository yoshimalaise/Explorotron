import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraceLensComponent } from './components/trace-lens/trace-lens.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { StudentTraceTablesComponent } from './components/student-trace-tables/student-trace-tables.component';
import {MatTabsModule} from '@angular/material/tabs';
import { TableTracerComponent } from './components/table-tracer/components/table-tracer/table-tracer.component';
import { VariableStepsTableComponent } from './components/variable-steps/components/variable-steps-table/variable-steps-table.component';
// import { VariableValuesPageComponent } from './components/variable-values/components/variable-values-page/variable-values-page.component';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    TraceLensComponent,
    StudentTraceTablesComponent,
    TableTracerComponent,
    VariableStepsTableComponent,
    // VariableValuesPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MonacoEditorModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatRadioModule
  ],
  exports: [
    TraceLensComponent
  ]
})
export class TraceModule { }
