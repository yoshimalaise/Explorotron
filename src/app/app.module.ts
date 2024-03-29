import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { AnnotateComponent } from './lenses/annotate/annotate.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
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
import { SessionProgressBarComponent } from './components/session-progress-bar/session-progress-bar.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TraceModule } from './lenses/trace/trace.module';
import { CodeQuestionsModule } from './lenses/code-questions/code-questions.module';
import { QuizModule } from './lenses/quiz/quiz.module';
import { SuggestedLensesComponent } from './components/suggested-lenses/suggested-lenses.component';
import { OpenInSuggestedComponent } from './components/open-in-suggested/open-in-suggested.component';
import { SuggestedTourLoaderComponent } from './components/suggested-tour-loader/suggested-tour-loader.component';
import { ExportToMobileComponent } from './components/export-to-mobile/export-to-mobile.component';
import { MicromaterialListComponent } from './components/micromaterial-list/micromaterial-list.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    LoadingScreenComponent,
    SessionProgressBarComponent,
    SuggestedLensesComponent,
    OpenInSuggestedComponent,
    SuggestedTourLoaderComponent,
    ExportToMobileComponent,
    MicromaterialListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
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
    StudyTourModule,
    TraceModule,
    CodeQuestionsModule,
    QuizModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
