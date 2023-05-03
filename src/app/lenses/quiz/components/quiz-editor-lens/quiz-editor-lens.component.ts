import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { Quiz, quizQuestionTypes, QuizQuestionType } from '../../model/quiz.interface';

@Component({
  selector: 'app-quiz-editor-lens',
  templateUrl: './quiz-editor-lens.component.html',
  styleUrls: ['./quiz-editor-lens.component.scss']
})
export class QuizEditorLensComponent {
  @Input() quiz: Quiz;
  types = quizQuestionTypes;
  selectedType: QuizQuestionType = QuizQuestionType.SINGLE_ANSWER;

  save() {
    const vscode = (window as any).acquireVsCodeApi();
    console.log(vscode);
    vscode.postMessage({
      command: 'saveQuiz',
      quiz: this.quiz
    })
  }

  addQuestion() {
    this.quiz.questions.push({ question: '', codeSnippet: '', type: this.selectedType});
  }

  drop(event: any) {
    moveItemInArray(this.quiz.questions, event.previousIndex, event.currentIndex);
  }
}
