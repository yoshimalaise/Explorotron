import { Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-tour-overview',
  templateUrl: './tour-overview.component.html',
  styleUrls: ['./tour-overview.component.scss']
})
export class TourOverviewComponent {

  constructor(public state: StateService) {

  }

  startTour() {
    const vscode = (window as any).acquireVsCodeApi();
    vscode.postMessage({
      command: 'startSession',
      tour: this.state.studyTour
    })
  }
}
