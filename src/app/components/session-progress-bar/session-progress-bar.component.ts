import { Component } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-session-progress-bar',
  templateUrl: './session-progress-bar.component.html',
  styleUrls: ['./session-progress-bar.component.scss']
})
export class SessionProgressBarComponent {
  constructor(public state: StateService, private sessionService: SessionService) {

  }

  markCompleted() {
    this.sessionService.markExercixeComplete();
  }

  loadExercise(index: number) {
    this.state.currentExerciseIndex = index;
    this.state.sourceCode = this.state.session.exercises[index].sourceCode;
    this.state.currentLense = this.state.session.exercises[index].lens;
  }
}
