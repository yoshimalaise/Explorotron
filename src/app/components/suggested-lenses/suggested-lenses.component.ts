import { Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { LensSuggestionService } from './services/lens-suggestion.service';
import { RecommendationProfile } from './model/recommendation-profile.interface';

@Component({
  selector: 'app-suggested-lenses',
  templateUrl: './suggested-lenses.component.html',
  styleUrls: ['./suggested-lenses.component.scss']
})
export class SuggestedLensesComponent {
  suggestions: RecommendationProfile[] = [];
  constructor(public state: StateService, private svc: LensSuggestionService){
  }

  ngOnInit() {
    this.suggestions = this.svc.generateSuggestions(this.state.sourceCode);
  }

  select(suggestion: RecommendationProfile) {
    this.state.currentLense = suggestion.lensId;
  }
}
