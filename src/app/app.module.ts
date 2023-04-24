import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { AnnotateComponent } from './lenses/annotate/annotate.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AnnotateModule } from './lenses/annotate/annotate.module';
import { PresentationModule } from './lenses/presentation/presentation.module';
import { FlowchartModule } from './lenses/flowchart/flowchart.module';
import { PickFlowchartModule } from './lenses/pick-flowchart/pick-flowchart.module';
import { ParsonsModule } from './lenses/parsons/parsons.module';
import { PseudoModule } from './lenses/pseudo/pseudo.module';
import { CommentSlotsModule } from './lenses/comment-slots/comment-slots.module';
import { ArgumentPickerModule } from './lenses/argument-picker/argument-picker.module';
import { BlanksModule } from './lenses/blanks/blanks.module';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { StudyTourModule } from './lenses/study-tour/study-tour.module';

@NgModule({
  declarations: [
    AppComponent,
    LoadingScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    AnnotateModule,
    PresentationModule,
    FlowchartModule,
    PickFlowchartModule,
    ParsonsModule,
    PseudoModule,
    CommentSlotsModule,
    ArgumentPickerModule,
    BlanksModule,
    MonacoEditorModule.forRoot(),
    StudyTourModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
