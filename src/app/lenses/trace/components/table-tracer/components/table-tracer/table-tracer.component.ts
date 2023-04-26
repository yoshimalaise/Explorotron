import { Component, OnInit } from '@angular/core';
import { studentTraceConfig } from 'src/app/lenses/trace/config/student-trace-config';
import { TableStep } from '../../models/table-step.interface';

@Component({
  selector: 'app-table-tracer',
  templateUrl: './table-tracer.component.html',
  styleUrls: ['./table-tracer.component.scss'],
})
export class TableTracerComponent implements OnInit {
  unaryOperators = studentTraceConfig.unaryOperators;
  unaryPostfixOperators = studentTraceConfig.unaryPostfixOperators;
  binaryOperators = studentTraceConfig.binaryOperators;
  operatorsTableSteps: TableStep[] = [];

  constructor() { }

  removeLast() {
    this.operatorsTableSteps.pop();
  }

  addUnaryPrefix() {
    this.operatorsTableSteps.push({ type: 'Unary-Prefix' });
  }

  addUnaryPostfix() {
    this.operatorsTableSteps.push({ type: 'Unary-Postfix' });
  }

  addBinary() {
    this.operatorsTableSteps.push({ type: 'Binary' });
  }

  addTernary() {
    this.operatorsTableSteps.push({ type: 'Ternary' });
  }

  async showAddStepDialog() {
    /*
    const actionSheet = await this.actionSheetController.create({
      header: 'Add Step',
      cssClass: 'action-sheet',
      buttons: [{
        text: 'Unary-Prefix',
        data: 'unary',
        handler: () => {
          this.addUnaryPrefix();
        }
      }, {
        text: 'Unary-Postfix',
        data: 'unary',
        handler: () => {
          this.addUnaryPostfix();
        }
      },
    {
        text: 'Binary',
        data: 'Binary',
        handler: () => {
          this.addBinary();
        }
      },
      {
        text: 'Ternary',
        data: 'unary',
        handler: () => {
          this.addTernary();
        }
      }]
    });
    await actionSheet.present();
    */
  }

  ngOnInit() {}


}
