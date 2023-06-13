import { Injectable } from '@angular/core';
import { BaseRecommendationGeneratorService } from './base-lense-recommender.service';
import { LenseIds } from 'src/app/model/lense-ids.enum';
import { PRIMMStage, RecommendationProfile } from '../model/recommendation-profile.interface';

@Injectable({
  providedIn: 'root'
})
export class AnnotateRGS extends BaseRecommendationGeneratorService {

  constructor() { 
    super(LenseIds.ANNOTATE, PRIMMStage.MODIFY);
  }

  generateRecommendationProfile(code: string): RecommendationProfile {
    return this.buildProfile(70);
  }


}
