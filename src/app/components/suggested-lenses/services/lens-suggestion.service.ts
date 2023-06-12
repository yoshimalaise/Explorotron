import { Injectable } from '@angular/core';
import { BaseRecommendationGeneratorService } from './base-lense-recommender.service';
import { RecommendationProfile } from '../model/recommendation-profile.interface';
import { AnnotateRGS } from './annotate-recommendation-generator.service';
import { ArgumentPickerRGS } from './argument-picker-rgs.service';
import { BlanksRGS } from './blanks-rg.service';
import { CodeQuestionsRGS } from './code-questions-rg.service';
import { CommentSlotsRGS } from './comment-slots-rg.service';
import { FlowchartRGS } from './flowchart-rg.service';
import { ParsonsRGS } from './parsons-rg.service';
import { PickFlowchartRGS } from './pick-flowchart-rg.service';
import { PseudoRGS } from './pseudo-rg.service';
import { TraceRGS } from './trace-rg.service';

@Injectable({
  providedIn: 'root'
})
export class LensSuggestionService {
  profileGenerators: BaseRecommendationGeneratorService[] = [
    new AnnotateRGS(),
    new ArgumentPickerRGS(),
    new BlanksRGS(),
    new CodeQuestionsRGS(),
    new CommentSlotsRGS(),
    new FlowchartRGS(),
    new ParsonsRGS(),
    new PickFlowchartRGS(),
    new PseudoRGS(),
    new TraceRGS()
  ];
  

  constructor() { }

  generateSuggestions(code: string): RecommendationProfile[] {
    return this.profileGenerators
      .map(g => g.generateRecommendationProfile(code))
      .filter(p => p.score !== 0)
      .sort((p1, p2) => p2.score - p1.score);
  }
}
