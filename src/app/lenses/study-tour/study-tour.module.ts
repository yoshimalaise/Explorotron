import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditStudyTourComponent } from './components/edit-study-tour/edit-study-tour.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FileBrowserComponent } from './components/file-browser/file-browser.component';
import {MatIconModule} from '@angular/material/icon';
import { FileSelectionDialogComponent } from './components/file-selection-dialog/file-selection-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { TourOverviewComponent } from './components/tour-overview/tour-overview.component';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    EditStudyTourComponent,
    FileBrowserComponent,
    FileSelectionDialogComponent,
    TourOverviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    DragDropModule
  ],
  exports: [
    EditStudyTourComponent,
    TourOverviewComponent
  ]
})
export class StudyTourModule { }
