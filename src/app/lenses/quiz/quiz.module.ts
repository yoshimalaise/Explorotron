import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizLensComponent } from './components/quiz-lens/quiz-lens.component';
import { QuizEditorLensComponent } from './components/quiz-editor-lens/quiz-editor-lens.component';
import { FormsModule } from '@angular/forms';
import { SingleAnswerComponent } from './components/editor-components/single-answer/single-answer.component';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MultipleAnswerComponent } from './components/editor-components/multiple-answer/multiple-answer.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatInputModule} from '@angular/material/input';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import { PerformSingleAnswerComponent } from './components/perform-components/perform-single-answer/perform-single-answer.component';
import { PerformMultipleAnswerComponent } from './components/perform-components/perform-multiple-answer/perform-multiple-answer.component';

@NgModule({
  declarations: [
    QuizLensComponent,
    QuizEditorLensComponent,
    SingleAnswerComponent,
    MultipleAnswerComponent,
    PerformSingleAnswerComponent,
    PerformMultipleAnswerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    DragDropModule,
    MatInputModule,
    MonacoEditorModule,
    MatRadioModule,
    MatIconModule,
    MatCheckboxModule,
    MatStepperModule
  ],
  exports: [
    QuizLensComponent,
    QuizEditorLensComponent
  ]
})
export class QuizModule { }
