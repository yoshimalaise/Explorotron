import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-file-selection-dialog',
  templateUrl: './file-selection-dialog.component.html',
  styleUrls: ['./file-selection-dialog.component.scss']
})
export class FileSelectionDialogComponent {
  constructor(public dialogRef: MatDialogRef<FileSelectionDialogComponent>, public state: StateService) {
    
  }

  select(entry: any) {
    this.dialogRef.close(entry);
  }
}
