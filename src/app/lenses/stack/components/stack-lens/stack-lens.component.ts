import { Component, Input, SimpleChanges } from '@angular/core';
import { StackAdvice } from '../../advice/stack-advice';
import { state } from '../../state/stack-command-state';
import * as acorn from 'acorn';
import { pointcut } from '../../pointcuts/pointcuts';
import { StackState } from '../../model/stack-state.interface';
import { StackCommand, StackCommandType } from '../../model/stack-command.interface';
import { editor } from 'monaco-editor';

declare var Aran;
declare var Astring;

@Component({
  selector: 'app-stack-lens',
  templateUrl: './stack-lens.component.html',
  styleUrls: ['./stack-lens.component.scss']
})
export class StackLensComponent {
  @Input() code: string;
  private aran = Aran({ namespace: 'ADVICE' });
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  setupDone = false;
  stackState: StackState = { frames: [] };
  commandIndex = 0;
  commands: StackCommand[] = [];

  editor: editor.ICodeEditor = undefined;
  oldDecorations = [];
  constructor() {}

  ngAfterViewInit(): void {
    this.generateStackHistory(this.code);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.generateStackHistory(changes.code.currentValue);
  }

  generateStackHistory(code: string){
    if (!this.setupDone) {
      (window as any).ADVICE = StackAdvice;
      (window as any).eval(Astring.generate(this.aran.setup()));
      state.aran = this.aran;
      this.setupDone = true;
    }
    state.commands = [];
    const estree1 = acorn.parse(code, { ecmaVersion: 9, locations: true });
    const estree2 = this.aran.weave(estree1, pointcut);
    (window as any).eval(Astring.generate(estree2));
    this.stackState.frames = [];
    this.commandIndex = 0;
    this.commands = state.commands;
  }

  moveForward() {
    if (this.commandIndex === this.commands.length - 1) {
      return;
    }
    const c = this.commands[this.commandIndex];
    if (c.command === StackCommandType.ADD_FRAME) {
      this.stackState.frames.push({ args: c.args, functionName: c.functionName });
    }

    if (c.command === StackCommandType.POP_FRAME) {
      this.stackState.frames.pop();
    }
    this.updateHighlights(c);
    this.commandIndex++;
  }

  moveBack() {
    if (this.commandIndex === 0) {
      return;
    }
    this.commandIndex--;
    const c = this.commands[this.commandIndex];
    if (c.command === StackCommandType.POP_FRAME) {
      this.stackState.frames.push({ args: c.args, functionName: c.functionName });
    }
    if (c.command === StackCommandType.ADD_FRAME) {
      this.stackState.frames.pop();
    }
    this.updateHighlights(c);
  }

  onInit(monacoEditor: editor.ICodeEditor): void {
    this.editor = monacoEditor;
  }

  updateHighlights(c: StackCommand) {
    const editorModel: editor.ITextModel = this.editor.getModel();
      const range = {startLineNumber: c.line, startColumn: c.col + 1, endLineNumber: c.endLine, endColumn: c.endCol + 1}
   
      // scroll to the result
      this.editor.revealRangeInCenter(range);
      // highlight the results
      const newDecorations = [
        {
          range: range,
          options: {
            isWholeLine: false,
            inlineClassName: 'code-highlight'
          }
        }
      ];
      this.oldDecorations = editorModel.deltaDecorations(this.oldDecorations, newDecorations);
  }

}
