import { Component, Input, SimpleChanges } from '@angular/core';
import { MultipleAnswerQuestion } from '../../../model/quiz.interface';

@Component({
  selector: 'app-multiple-answer',
  templateUrl: './multiple-answer.component.html',
  styleUrls: ['./multiple-answer.component.scss']
})
export class MultipleAnswerComponent {
  @Input() question: MultipleAnswerQuestion;

  ngOnChanges(changes: SimpleChanges) {
    if(!changes.question.currentValue.answers) {
      changes.question.currentValue.answers = [];
    }
  }
}
