import { Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { VSCodeCommunicationService } from 'src/app/services/vscode-communication.service';

@Component({
  selector: 'app-tour-overview',
  templateUrl: './tour-overview.component.html',
  styleUrls: ['./tour-overview.component.scss']
})
export class TourOverviewComponent {

  constructor(public state: StateService, private vsService: VSCodeCommunicationService) {

  }

  startTour() {
    this.vsService.sendMessage('startSession', {
      command: 'startSession',
      tour: this.state.studyTour
    });
  }
}
