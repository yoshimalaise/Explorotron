import { Injectable } from '@angular/core';
import { LenseIds } from 'src/app/model/lense-ids.enum';
import { RecommendationProfile } from '../model/recommendation-profile.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseRecommendationGeneratorService {
  constructor(private lensId: LenseIds) { }

  generateRecommendationProfile(code: string): RecommendationProfile {
    return { lensId: this.lensId, score: 0};
  }
}
