import { Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { LensSuggestionService } from './services/lens-suggestion.service';

@Component({
  selector: 'app-suggested-lenses',
  templateUrl: './suggested-lenses.component.html',
  styleUrls: ['./suggested-lenses.component.scss']
})
export class SuggestedLensesComponent {
  test = "";

  constructor(public state: StateService, private svc: LensSuggestionService){
  }

  ngOnInit() {
   this.test = JSON.stringify(this.svc.generateSuggestions(this.state.sourceCode));
  }
}
