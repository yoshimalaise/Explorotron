import { Injectable } from '@angular/core';
import { BaseRecommendationGeneratorService } from './base-lense-recommender.service';
import { LenseIds } from 'src/app/model/lense-ids.enum';
import { RecommendationProfile, PRIMMStage } from '../model/recommendation-profile.interface';

@Injectable({
  providedIn: 'root'
})
export class PseudoRGS extends BaseRecommendationGeneratorService {

  constructor() {
    super(LenseIds.PSEUDIFY, PRIMMStage.PREDICT)
   }

   generateRecommendationProfile(code: string): RecommendationProfile {
    return this.buildProfile(50);
  }
}
