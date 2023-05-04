import { Component, Input, SimpleChanges } from '@angular/core';
import { QuizQuestion, SingleAnswer, SingleAnswerQuestion } from '../../../model/quiz.interface';

@Component({
  selector: 'app-single-answer',
  templateUrl: './single-answer.component.html',
  styleUrls: ['./single-answer.component.scss']
})
export class SingleAnswerComponent {
  @Input() question: SingleAnswerQuestion;
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

  markAnswerAsCorrect(answer: SingleAnswer, event: any) {
    event.stopPropagation();
    this.question.answers.forEach(a => a.isCorrect = false);
    answer.isCorrect = true;
  }

  removeAnswer(answer: SingleAnswer) {
    this.question.answers = this.question.answers.filter(a => a !== answer);
  }
}
