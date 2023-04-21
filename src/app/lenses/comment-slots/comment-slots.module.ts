import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentSlotLensComponent } from './components/comment-slot-lens/comment-slot-lens.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    CommentSlotLensComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  exports: [
    CommentSlotLensComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CommentSlotsModule { }
