import { Component, Input } from '@angular/core';
import { Quiz } from '../model/quiz.interface';

@Component({
  selector: 'app-quiz-editor-lens',
  templateUrl: './quiz-editor-lens.component.html',
  styleUrls: ['./quiz-editor-lens.component.scss']
})
export class QuizEditorLensComponent {
  @Input() quiz: Quiz;
}
