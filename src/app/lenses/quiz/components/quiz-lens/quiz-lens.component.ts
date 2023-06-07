import { Component, Input } from '@angular/core';
import { Quiz, QuizQuestion } from '../../model/quiz.interface';
import { QuizQuestionType } from '../../model/quiz.interface';
import { MultipleAnswerQuestion } from '../../model/quiz.interface';

@Component({
  selector: 'app-quiz-lens',
  templateUrl: './quiz-lens.component.html',
  styleUrls: ['./quiz-lens.component.scss']
})
export class QuizLensComponent {
  @Input() quiz: Quiz;

  showCorrection: boolean = false;

  showCorrections() {
    this.showCorrection = true;
  }

  isCorrectlyAnswered(q: QuizQuestion): boolean {
    if (q.type === QuizQuestionType.SINGLE_ANSWER) {
      
    }

    if (q.type === QuizQuestionType.MULTIPLE_ANSWER) {
      
      return (q as MultipleAnswerQuestion).answers
        .map( o => (o.isCorrect && !o.isSelected) || (!o.isCorrect && o.isSelected))
        .reduce((curr, acc) => curr && acc, true);
    }
    return true;
  }
}