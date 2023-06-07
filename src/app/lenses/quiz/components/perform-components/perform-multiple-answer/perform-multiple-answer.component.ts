import { Component, Input, SimpleChanges } from '@angular/core';
import { MultipleAnswerQuestion } from '../../../model/quiz.interface';

@Component({
  selector: 'app-perform-multiple-answer',
  templateUrl: './perform-multiple-answer.component.html',
  styleUrls: ['./perform-multiple-answer.component.scss']
})
export class PerformMultipleAnswerComponent {
  @Input() question: MultipleAnswerQuestion;
  editorOptions = {theme: 'vs-dark', language: 'javascript'};

  @Input() showCorrection: boolean;

  correctionResultClass = "";

  ngOnChanges(changes: SimpleChanges) {
    if (changes.showCorrection.currentValue) {
      this.renderCorrections();
    }
  }

  renderCorrections() {
    let isCorrect = true;
    this.question.answers.forEach( o => {
      if ((o.isCorrect && !o.isSelected) || (!o.isCorrect && o.isSelected)) {
        isCorrect = false
      }
    });
    this.correctionResultClass = isCorrect ? "correct" : "wrong";
    this.question.answeredCorrectly = isCorrect;
  }
}
