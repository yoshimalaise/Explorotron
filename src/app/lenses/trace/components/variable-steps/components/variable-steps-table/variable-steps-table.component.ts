import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { StateStoreService } from 'src/app/state/state-store.service';
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

  constructor(public actionSheetController: ActionSheetController, public state: StateStoreService) { }

  ngOnInit() {}

  addStep() {
    this.state.variableSteps.forEach(s => s.selected = false);
    this.state.variableSteps.push({selected: true});
  }

  select(step: VariableStep) {
    this.state.variableSteps.forEach(s => s.selected = false);
    step.selected = true;
  }

  printPdf() {
    setTimeout(() => window.print(), 300);
  }

  exportJson() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ traceType: "variable-steps", body: this.state.variableSteps}));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "traceTable.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  async export() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Export trace',
      buttons: [{
        text: 'Print to PDF',
        handler: () => {
          this.printPdf();
        }
      }, {
        text: 'Export as JSON',
        handler: () => {
          this.exportJson();
        }
      }]
    });
    await actionSheet.present();
  }

}
