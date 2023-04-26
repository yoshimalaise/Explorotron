import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraceLensComponent } from './components/trace-lens/trace-lens.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    TraceLensComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    TraceLensComponent
  ]
})
export class TraceModule { }
