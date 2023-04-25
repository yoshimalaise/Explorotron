import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private state: StateService, private _snackBar: MatSnackBar) { 
    
  }

  markExercixeComplete() {
    if (this.state.isTour && this.state.session) {
      this.state.session.exercises[this.state.currentExerciseIndex].isCompleted = true;
    } else {
      this._snackBar.open("Exercise complete!");
    }
  }
}
