import { Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-session-progress-bar',
  templateUrl: './session-progress-bar.component.html',
  styleUrls: ['./session-progress-bar.component.scss']
})
export class SessionProgressBarComponent {
  constructor(public state: StateService) {

  }

  markCompleted() {
    
  }
}
