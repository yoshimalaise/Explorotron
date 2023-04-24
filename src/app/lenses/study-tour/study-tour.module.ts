import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditStudyTourComponent } from './components/edit-study-tour/edit-study-tour.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    EditStudyTourComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    EditStudyTourComponent
  ]
})
export class StudyTourModule { }
