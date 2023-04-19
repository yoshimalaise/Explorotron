import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';


const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
