import { Component, Input } from '@angular/core';
import { Quiz } from '../../model/quiz.interface';

@Component({
  selector: 'app-quiz-lens',
  templateUrl: './quiz-lens.component.html',
  styleUrls: ['./quiz-lens.component.scss']
})
export class QuizLensComponent {
  @Input() quiz: Quiz;
}
