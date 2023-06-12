import { Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-suggested-lenses',
  templateUrl: './suggested-lenses.component.html',
  styleUrls: ['./suggested-lenses.component.scss']
})
export class SuggestedLensesComponent {
  constructor(public state: StateService){

  }
}
