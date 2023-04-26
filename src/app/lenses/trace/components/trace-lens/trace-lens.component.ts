import { Component, Input } from '@angular/core';
import * as acorn from 'acorn';
import * as generator from 'escodegen';
import * as walk from 'acorn-walk';
import { pointcut } from '../../pointcuts/pointcut';
import { ADVICE } from '../../advice/advice';
import { state } from '../../state/state';

declare var Aran;
declare var Astring;

@Component({
  selector: 'app-trace-lens',
  templateUrl: './trace-lens.component.html',
  styleUrls: ['./trace-lens.component.scss']
})
export class TraceLensComponent {
  private aran = Aran({ namespace: 'ADVICE' });
  @Input() code: string;

  constructor() {
    //console.log(this.aran);
    // (window as any).ADVICE = ADVICE;
  }

  ngAfterViewInit() {
    this.trace();
  }

  trace() {
    /* 
    const scopeDepth = 1;
    const blockLabels = [];
    const loggedSteps = 0;
    const callExpressions = [];

    const ast = acorn.parse(this.code, { locations: true, ecmaVersion: 9 });
    const wovenAst = this.aran.weave(ast, pointcut);
    const instrumented = Astring.generate(wovenAst);
    console.log(instrumented);
    eval(Astring.generate(this.aran.setup()));
    const res = eval(instrumented);
    */

    
    let depth = "";
    (window as any).ADVICE = ADVICE;
    (window as any).eval(Astring.generate(this.aran.setup()));
    const estree1 = acorn.parse(this.code, { ecmaVersion: 9 });
    const estree2 = this.aran.weave(estree1, pointcut);
    state.depth = "";
    state.variableEvents = [];
    (window as any).eval(Astring.generate(estree2));
  }

}
