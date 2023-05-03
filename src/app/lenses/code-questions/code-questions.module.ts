import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeQuestionsLensComponent } from './components/code-questions-lens/code-questions-lens.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import {MatRadioModule} from '@angular/material/radio';
import { QuestionCardMultipleAnswersComponent } from './components/question-card-multiple-answers/question-card-multiple-answers.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    CodeQuestionsLensComponent,
    QuestionCardComponent,
    QuestionCardMultipleAnswersComponent
  ],
  imports: [
    CommonModule,
    MonacoEditorModule,
    FormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  exports: [
    CodeQuestionsLensComponent
  ]
})
export class CodeQuestionsModule { }
