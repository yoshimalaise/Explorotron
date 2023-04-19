import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { AnnotateComponent } from './lenses/annotate/annotate.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AnnotateModule } from './lenses/annotate/annotate.module';

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
    AnnotateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
