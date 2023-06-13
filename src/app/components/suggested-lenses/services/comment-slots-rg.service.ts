import { Injectable } from '@angular/core';
import { BaseRecommendationGeneratorService } from './base-lense-recommender.service';
import { LenseIds } from 'src/app/model/lense-ids.enum';
import { PRIMMStage, RecommendationProfile } from '../model/recommendation-profile.interface';
import * as acorn from 'acorn';

@Injectable({
  providedIn: 'root'
})
export class CommentSlotsRGS extends BaseRecommendationGeneratorService {

  constructor() {
    super(LenseIds.COMMENT_SLOTS, PRIMMStage.INVESTIGATE)
  }

  generateRecommendationProfile(code: string): RecommendationProfile {
    try {
      let comments = [];
      acorn.parse(code, {
        ecmaVersion: 9,
        locations: true,
        onComment: (isBlock, text, start) => {
          comments.push({ isBlock, text, start });
        },
      });
      const l = comments.length;

      if (l > 7)
        return this.buildProfile(100);
      if (l > 6)
        return this.buildProfile(95);
      if (l > 5)
        return this.buildProfile(90);
      if (l > 4)
        return this.buildProfile(85);
      if (l > 3)
        return this.buildProfile(80);
      if (l > 3)
        return this.buildProfile(50);

      return this.unApplicableProfile
    } catch {
      return this.unApplicableProfile;
    }
  }
}
