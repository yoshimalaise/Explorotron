import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackLensComponent } from './components/stack-lens/stack-lens.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    StackLensComponent
  ],
  imports: [
    CommonModule,
    MonacoEditorModule,
    FormsModule,
    MatIconModule
  ],
  exports: [
    StackLensComponent
  ]
})
export class StackModule { }
