import { Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-edit-study-tour',
  templateUrl: './edit-study-tour.component.html',
  styleUrls: ['./edit-study-tour.component.scss']
})
export class EditStudyTourComponent {
  constructor(public state: StateService) {

  }

  save() {
    const vscode = (window as any).acquireVsCodeApi();
    console.log(vscode);
    vscode.postMessage({
      command: 'saveTour',
      tour: this.state.studyTour
  })
  }
}
