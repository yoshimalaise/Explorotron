import { Component, Input, SimpleChanges } from '@angular/core';
import { QlcjsOption, QlcjsQuestion } from '../../model/qlcjs-question.interface';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent {
  @Input() question: QlcjsQuestion;
  @Input() showCorrection: boolean;
  selectedOption: QlcjsOption = undefined;
  correctionResultClass = "";

  ngOnChanges(changes: SimpleChanges) {
    if (changes.showCorrection.currentValue) {
      this.renderCorrections();
    }
  }

  renderCorrections() {
    const isCorrect = this.selectedOption && this.selectedOption.correct;
    this.correctionResultClass = isCorrect ? "correct" : "wrong";
  }
}
