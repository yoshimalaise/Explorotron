import { AfterViewInit, Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { LensSuggestionService } from '../suggested-lenses/services/lens-suggestion.service';
import { PRIMMStage } from '../suggested-lenses/model/recommendation-profile.interface';

@Component({
  selector: 'app-suggested-tour-loader',
  templateUrl: './suggested-tour-loader.component.html',
  styleUrls: ['./suggested-tour-loader.component.scss']
})
export class SuggestedTourLoaderComponent implements AfterViewInit {

  constructor(private state: StateService, private svc: LensSuggestionService) {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const applicableLenses = this.svc.generateSuggestions(this.state.sourceCode);
      this.state.isTour = true;
      this.state.session = {
        name: "suggested tour",
        exercises: ([PRIMMStage.PREDICT, PRIMMStage.RUN, PRIMMStage.INVESTIGATE, PRIMMStage.MODIFY, PRIMMStage.MAKE])
          .map(stage => applicableLenses.filter(p => p.primmStage === stage))
          .reduce((curr, acc) => [...curr, ...acc], [])
          .map(profile => ({
            lens: profile.lensId,
            file: "suggested",
            isCompleted: false,
            sourceCode: this.state.sourceCode
          }))
      };
      if (this.state.session.exercises.length > 0) {
        this.state.currentExerciseIndex = 0;
        this.state.sourceCode = this.state.session.exercises[0].sourceCode;
        this.state.currentLense = this.state.session.exercises[0].lens;
      }
    }, 300);
  }

}
