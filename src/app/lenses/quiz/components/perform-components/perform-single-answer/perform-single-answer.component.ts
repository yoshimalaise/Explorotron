import { Component, Input, SimpleChanges } from '@angular/core';
import { SingleAnswer, SingleAnswerQuestion } from '../../../model/quiz.interface';

@Component({
  selector: 'app-perform-single-answer',
  templateUrl: './perform-single-answer.component.html',
  styleUrls: ['./perform-single-answer.component.scss']
})
export class PerformSingleAnswerComponent {
  @Input() question: SingleAnswerQuestion;
  editorOptions = {theme: 'vs-dark', language: 'javascript'};

  @Input() showCorrection: boolean;
  selectedOption:  SingleAnswer = undefined;
  correctionResultClass = "";

  ngOnChanges(changes: SimpleChanges) {
    if (changes.showCorrection?.currentValue) {
      this.renderCorrections();
    }
  }

  renderCorrections() {
    const isCorrect = this.selectedOption && this.selectedOption.isCorrect;
    this.correctionResultClass = isCorrect ? "correct" : "wrong";
  }
}
