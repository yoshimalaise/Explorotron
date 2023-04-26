import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { StateStoreService } from 'src/app/state/state-store.service';
import { VariableValues } from '../../models/variable-values.interface';

@Component({
  selector: 'app-variable-values-page',
  templateUrl: './variable-values-page.component.html',
  styleUrls: ['./variable-values-page.component.scss'],
})
export class VariableValuesPageComponent implements OnInit {
  expandAll: String[] = [];

  constructor(private alertController: AlertController, public actionSheetController: ActionSheetController,
    public state: StateStoreService) { }

  ngOnInit() {}

  async addVariable() {
    const alert = await this.alertController.create({
      header: 'Please enter the variable name',
      buttons: ['OK'],
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          id: 'name'
        }
      ],
    });

    alert.onDidDismiss().then((res) => {
      if (!res.data) {
        return;
      }
      const varname = res.data.values.name;
      this.state.variableValues.push({ values: [], name: varname });
    });

    await alert.present();
  }

  removeLine(v: VariableValues) {
    v.values.pop();
  }

  async addLine(v: VariableValues) {
    const alert = await this.alertController.create({
      header: 'Please enter the updated value',
      buttons: ['OK'],
      inputs: [
        {
          name: 'lineNumber',
          id: 'line-number',
          type: 'number',
          placeholder: 'line number'
        },
        {
          name: 'value',
          id: 'val',
          placeholder: 'value'
        }
      ],
    });

    alert.onDidDismiss().then((res) => {
      if (!res.data) {
        return;
      }
      v.values.push({ lineNumber: res.data.values.lineNumber, value: res.data.values.value });
    });

    await alert.present();
  }

  printPdf() {
    this.expandAll = this.state.variableValues.map(vv => vv.name);
    setTimeout(() => window.print(), 300);
  }

  exportJson() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ traceType: "variable-values", body: this.state.variableValues}));
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
