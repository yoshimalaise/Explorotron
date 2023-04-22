import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlanksLensComponent } from './components/blanks-lens/blanks-lens.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BlanksLensComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule
  ],
  exports: [
    BlanksLensComponent
  ]
})
export class BlanksModule { }
