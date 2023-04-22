import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { APFunction } from '../../model/ap-function.interface';
import * as generator from 'escodegen';
import * as acorn from 'acorn';

@Component({
  selector: 'app-argument-picker-function',
  templateUrl: './argument-picker-function.component.html',
  styleUrls: ['./argument-picker-function.component.scss']
})
export class ArgumentPickerFunctionComponent {
  @Input() func: APFunction;
  @Output() doneEvent = new EventEmitter<boolean>();
  @ViewChild('code') codeEl: any;

  values = [];
  slotCount: number;

  ngAfterViewInit(): void {
    this.loadCode(this.func);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadCode(changes.func.currentValue);
  }

  loadCode(func: APFunction) {
    this.values = [];
    const options = this.func.arguments.map(p => `<option value="${p}">${p}</option>`).join('');
    const comboBoxStr = `<select><option value="none">_______</option>${options}</select>`;

    if (!this.codeEl) {
      return;
    }

    setTimeout(() => {
      const field = this.codeEl.nativeElement.getElementsByTagName('code')[0];
      try {
        this.slotCount = field.innerHTML.split('_______').length - 1;
        field.innerHTML = field.innerHTML.split('_______').join(comboBoxStr);
      } catch {
        console.log('field not done loading yet');
      }
      

      setTimeout(() => this.registerHandlers(), 300);
    }, 300);
  }

  private registerHandlers() {
    const selectFields =  this.codeEl.nativeElement.getElementsByTagName('select');
    for (let i = 0; i < selectFields.length; i++) {
      const f = selectFields[i];
      f.addEventListener('change', ($event) => {
        this.values = this.values.filter(v => v.index !== i);

        let selected;
        for (const o of f.getElementsByTagName('option')) {
          if (o.selected) {
            selected = o.value;
          }
        }

        this.values.push({index: i, value: selected});
        if (this.values.length === this.slotCount) {
          this.checkForWin();
        }
      });
    }
  }

  private checkForWin() {
    // fill in the user selected values in the code
    let userComposedCode = this.func.functionBody;
    this.values.forEach(v => {
      userComposedCode = userComposedCode.replace('_______', v.value);
    });

    if (generator.generate(acorn.parse(userComposedCode, {ecmaVersion: 9}))
          === generator.generate(acorn.parse(this.func.originalFunctionBody, {ecmaVersion: 9}))) {
      this.func.isComplete = true;
      this.doneEvent.emit(true);
    }
  }
}
