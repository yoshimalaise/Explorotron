import { Injectable } from '@angular/core';
import { BaseRecommendationGeneratorService } from './base-lense-recommender.service';
import { LenseIds } from 'src/app/model/lense-ids.enum';
import { PRIMMStage, RecommendationProfile } from '../model/recommendation-profile.interface';
import { BlanksGeneratorService } from 'src/app/lenses/blanks/services/blanks-generator.service';

@Injectable({
  providedIn: 'root'
})
export class BlanksRGS extends BaseRecommendationGeneratorService {

  constructor() { 
    super(LenseIds.BLANKS, PRIMMStage.MODIFY)
  }

  generateRecommendationProfile(code: string): RecommendationProfile {
    try {
      const l = code.split("\n").length;
      if (l > 15 && l < 20) 
        return this.buildProfile(90);
      if (l > 15 && l < 30)
        return this.buildProfile(80);
      if (l > 15 && l < 40)
        return this.buildProfile(60);
      if (l < 15 && l > 10)
        return this.buildProfile(70);
      if (l >= 40 && l < 50)
        return this.buildProfile(30);

      return this.unApplicableProfile;
    } catch {
      return this.unApplicableProfile;
    }
    
  }
}
