import { Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-blanks-solution-dialog',
  templateUrl: './blanks-solution-dialog.component.html',
  styleUrls: ['./blanks-solution-dialog.component.scss']
})
export class BlanksSolutionDialogComponent {

  editorOptions = {theme: 'vs-dark', language: 'javascript'};

  constructor(public state: StateService) {}


}
