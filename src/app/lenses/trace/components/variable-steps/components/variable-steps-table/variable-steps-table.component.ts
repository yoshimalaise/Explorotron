import { Component, OnInit } from '@angular/core';
import { VariableStep } from '../../models/variable-step.interface';

@Component({
  selector: 'app-variable-steps-table',
  templateUrl: './variable-steps-table.component.html',
  styleUrls: ['./variable-steps-table.component.scss'],
})
export class VariableStepsTableComponent implements OnInit {
  actions = [
    'declare',
    'declare, init',
    'read',
    'assign'
  ];
  variableSteps: VariableStep[] = [];

  constructor() { }

  ngOnInit() {}

  addStep() {
    this.variableSteps.forEach(s => s.selected = false);
    this.variableSteps.push({selected: true});
  }

  select(step: VariableStep) {
    this.variableSteps.forEach(s => s.selected = false);
    step.selected = true;
  }


}
