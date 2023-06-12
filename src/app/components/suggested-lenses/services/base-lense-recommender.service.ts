import { Injectable } from '@angular/core';
import { LenseIds } from 'src/app/model/lense-ids.enum';
import { PRIMMStage, RecommendationProfile } from '../model/recommendation-profile.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseRecommendationGeneratorService {
  protected readonly unApplicableProfile: RecommendationProfile

  constructor(protected lensId: LenseIds, protected stage: PRIMMStage) { 
    this.unApplicableProfile = this.buildProfile(0);
  }

  generateRecommendationProfile(code: string): RecommendationProfile {
    return this.buildProfile(0);
  }

  protected buildProfile(score: number){
    return { lensId: this.lensId, score: score, primmStage: this.stage };
  }

  protected parse(code: string) {

  }
}
