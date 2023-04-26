import { Component, Input } from '@angular/core';
import * as acorn from 'acorn';
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
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  traceState = state;

  constructor() {
  }

  ngAfterViewInit() {
    (window as any).ADVICE = ADVICE;
    (window as any).eval(Astring.generate(this.aran.setup()));
  }

  trace() {
    const estree1 = acorn.parse(this.code, { ecmaVersion: 9, locations: true });
    const estree2 = this.aran.weave(estree1, pointcut);
    this.resetState();
    (window as any).eval(Astring.generate(estree2));
    console.log(state);
  }

  resetState() {
    state.depth = "";
    state.variableEvents = [];
    state.aran = this.aran;
  }

  closeTraceTable() {
    this.resetState();
  }

}
