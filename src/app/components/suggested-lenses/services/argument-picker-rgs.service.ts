import { Injectable } from '@angular/core';
import { BaseRecommendationGeneratorService } from './base-lense-recommender.service';
import { LenseIds } from 'src/app/model/lense-ids.enum';
import { RecommendationProfile, PRIMMStage } from '../model/recommendation-profile.interface';
import { ArgumentPickerServiceService } from 'src/app/lenses/argument-picker/services/argument-picker-service.service';

@Injectable({
  providedIn: 'root'
})
export class ArgumentPickerRGS extends BaseRecommendationGeneratorService {

  constructor(private svc: ArgumentPickerServiceService) { 
    super(LenseIds.ARGUMENT_PICKER, PRIMMStage.MODIFY)
  }

  generateRecommendationProfile(code: string): RecommendationProfile {
    try {
      const qs = this.svc.generateAPQuestions(code);
      if (qs.length < 1) {
        return this.unApplicableProfile;
      }
      const lengths = qs.map(q => q.arguments.length);
      if (lengths.filter(l => l < 2).length < 1) {
        return this.unApplicableProfile;
      }
      if (lengths.filter(l => l > 3).length > 0) {
        return this.buildProfile(90);
      }
      
      return this.buildProfile(70);
    } catch {
      return this.unApplicableProfile;
    }
    
    
  }
}
