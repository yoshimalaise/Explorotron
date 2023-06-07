import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AVAILABLE_LENSES, LenseIds } from 'src/app/model/lense-ids.enum';
import { TourExercise } from 'src/app/model/study-tour.interface';
import { StateService } from 'src/app/services/state.service';
import { FileSelectionDialogComponent } from '../file-selection-dialog/file-selection-dialog.component';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { VSCodeCommunicationService } from 'src/app/services/vscode-communication.service';

@Component({
  selector: 'app-edit-study-tour',
  templateUrl: './edit-study-tour.component.html',
  styleUrls: ['./edit-study-tour.component.scss']
})
export class EditStudyTourComponent {
  lenseOptions = AVAILABLE_LENSES;

  constructor(public state: StateService, public dialog: MatDialog, private vsService: VSCodeCommunicationService) {

  }

  save() {
    this.vsService.sendMessage('saveTour' , {
      command: 'saveTour',
      tour: this.state.studyTour
    });
  }

  ngAfterViewInit() {
   
  }

  addExercise() {
    const dialogRef = this.dialog.open(FileSelectionDialogComponent, {
      width: "60%",
      height: "80%"
    });

    dialogRef.afterClosed().subscribe(file => {
      this.state.studyTour.exercises.push({
        file: file.path.replace(this.state.root, ""),
        lens: LenseIds.ANNOTATE
      });
    });
  }

  removeExercise(ex: TourExercise) {
    this.state.studyTour.exercises = this.state.studyTour.exercises.filter(e => e !== ex);
  }

  drop(event: any) {
    moveItemInArray(this.state.studyTour.exercises, event.previousIndex, event.currentIndex);
  }
}
