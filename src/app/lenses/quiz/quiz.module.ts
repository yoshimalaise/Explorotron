import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizLensComponent } from './components/quiz-lens/quiz-lens.component';
import { QuizEditorLensComponent } from './components/quiz-editor-lens/quiz-editor-lens.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    QuizLensComponent,
    QuizEditorLensComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    QuizLensComponent,
    QuizEditorLensComponent
  ]
})
export class QuizModule { }
