import { Component, OnInit } from '@angular/core';
import { ValueEntry, VariableValues } from '../../models/variable-values.interface';

@Component({
  selector: 'app-variable-values-page',
  templateUrl: './variable-values-page.component.html',
  styleUrls: ['./variable-values-page.component.scss'],
})
export class VariableValuesPageComponent implements OnInit {
  expandAll: String[] = [];
  variableValues: VariableValues[] = [];
  newVarName: string = "";

  constructor() { }

  ngOnInit() { }

  addVariable() {
    if (this.newVarName === "") {
      return;
    }
    this.variableValues.push({ values: [], name: this.newVarName });
    this.newVarName = "";
  }

  deleteVariable(vv: VariableValues, event: any) {
    event.stopPropagation();
    this.variableValues = this.variableValues.filter(x => x !== vv);
  }

  removeLine(v: VariableValues, line: ValueEntry) {
    v.values = v.values.filter(e => e !== line);
  }

  addLine(v: VariableValues) {
    if (v.newLineNumber === undefined || v.newLineValue === '') {
      return;
    }
    v.values.push({ lineNumber: v.newLineNumber, value: v.newLineValue });
    v.newLineNumber = undefined;
    v.newLineValue = "";
  }



}
