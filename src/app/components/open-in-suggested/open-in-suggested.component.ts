import { AfterViewInit, Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { LensSuggestionService } from '../suggested-lenses/services/lens-suggestion.service';

@Component({
  selector: 'app-open-in-suggested',
  templateUrl: './open-in-suggested.component.html',
  styleUrls: ['./open-in-suggested.component.scss']
})
export class OpenInSuggestedComponent implements AfterViewInit {

  constructor(private state: StateService, private svc: LensSuggestionService) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.state.currentLense = this.svc.generateSuggestions(this.state.sourceCode)[0].lensId;
      console.log(this.state.currentLense)
    }, 300);
  }
}
