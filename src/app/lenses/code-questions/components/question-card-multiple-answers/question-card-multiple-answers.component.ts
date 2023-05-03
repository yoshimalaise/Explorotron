import { Component, Input, SimpleChanges } from '@angular/core';
import { QlcjsQuestion } from '../../model/qlcjs-question.interface';

@Component({
  selector: 'app-question-card-multiple-answers',
  templateUrl: './question-card-multiple-answers.component.html',
  styleUrls: ['./question-card-multiple-answers.component.scss']
})
export class QuestionCardMultipleAnswersComponent {
  @Input() question: QlcjsQuestion;
  @Input() showCorrection: boolean;

  correctionResultClass = "";

  ngOnChanges(changes: SimpleChanges) {
    if (changes.showCorrection.currentValue) {
      this.renderCorrections();
    }
  }

  renderCorrections() {
    let isCorrect = true;
    this.question.options.forEach( o => {
      if ((o.correct && !o.currentlySelected) || (!o.correct && o.currentlySelected)) {
        isCorrect = false
      }
    });
    this.correctionResultClass = isCorrect ? "correct" : "wrong";
  }
}
