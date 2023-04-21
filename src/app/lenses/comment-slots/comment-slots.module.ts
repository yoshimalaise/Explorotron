import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentSlotLensComponent } from './components/comment-slot-lens/comment-slot-lens.component';



@NgModule({
  declarations: [
    CommentSlotLensComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommentSlotLensComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CommentSlotsModule { }
