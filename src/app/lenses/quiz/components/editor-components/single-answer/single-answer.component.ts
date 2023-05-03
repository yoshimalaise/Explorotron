import { Component, Input, SimpleChanges } from '@angular/core';
import { QuizQuestion, SingleAnswerQuestion } from '../../../model/quiz.interface';

@Component({
  selector: 'app-single-answer',
  templateUrl: './single-answer.component.html',
  styleUrls: ['./single-answer.component.scss']
})
export class SingleAnswerComponent {
  @Input() question: SingleAnswerQuestion;
  newAnswer: string = "";

  ngOnChanges(changes: SimpleChanges) {
    if(!changes.question.currentValue.answers) {
      changes.question.currentValue.answers = [];
    }
  }

  addAnswer() {
    this.question.answers.push({isCorrect: false, answer: this.newAnswer  });
    this.newAnswer = "";
  }
}
