import { Component, Input, SimpleChanges } from '@angular/core';
declare let qlcjs: any;

@Component({
  selector: 'app-code-questions-lens',
  templateUrl: './code-questions-lens.component.html',
  styleUrls: ['./code-questions-lens.component.scss']
})
export class CodeQuestionsLensComponent {
  @Input() code: string;
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  questions: any[] = [];
  showCorrection: boolean = false;

  ngAfterViewInit(): void {
    this.generateQuestions(this.code);
  }

  ngOnChanges(changes: SimpleChanges) {
   this.generateQuestions(this.code);
  }

  generateQuestions(code: string) {
    if (!code) {
      return
    }
    const qs = qlcjs.generate(code, [
      { count: 5, fill: true, uniqueTypes: false }
    ]);
    // single: LoopEnd, VariableDeclaration, FunctionName
    // multiple: ParameterName, 
    const multipleAnswerTypes = ['ParameterName'];
    qs.forEach(q => q.multipleAnswers = multipleAnswerTypes.includes(q.type));
    this.questions = qs;
    console.log(this.questions);
  }

  submit() {
    this.showCorrection = true;
  }
}
