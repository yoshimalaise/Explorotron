import { Component, Input, SimpleChanges } from '@angular/core';
import { MultipleAnswer, MultipleAnswerQuestion } from '../../../model/quiz.interface';

@Component({
  selector: 'app-multiple-answer',
  templateUrl: './multiple-answer.component.html',
  styleUrls: ['./multiple-answer.component.scss']
})
export class MultipleAnswerComponent {
  @Input() question: MultipleAnswerQuestion;
  newAnswer: string = "";
  editorOptions = {theme: 'vs-dark', language: 'javascript'};

  ngOnChanges(changes: SimpleChanges) {
    if(!changes.question.currentValue.answers) {
      changes.question.currentValue.answers = [];
    }
  }

  addAnswer() {
    this.question.answers.push({isCorrect: false, answer: this.newAnswer  });
    this.newAnswer = "";
  }

  removeAnswer(answer: MultipleAnswer) {
    this.question.answers = this.question.answers.filter(a => a !== answer);
  }
}
