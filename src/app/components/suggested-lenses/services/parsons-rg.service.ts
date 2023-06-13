import { Injectable } from '@angular/core';
import { BaseRecommendationGeneratorService } from './base-lense-recommender.service';
import { LenseIds } from 'src/app/model/lense-ids.enum';
import { PRIMMStage, RecommendationProfile } from '../model/recommendation-profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ParsonsRGS extends BaseRecommendationGeneratorService {

  constructor() {
    super(LenseIds.PARSONS, PRIMMStage.MODIFY)
  }

  generateRecommendationProfile(code: string): RecommendationProfile {
    const l = code.split("\n").length;
    if (l >= 8 && l <= 15)
      return this.buildProfile(90);
    if (l >= 8 && l <= 20)
      return this.buildProfile(80);
    if (l >= 5 && l <= 25)
      return this.buildProfile(50);
    return this.unApplicableProfile;
  }
}
