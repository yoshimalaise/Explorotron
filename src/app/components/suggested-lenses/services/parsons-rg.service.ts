import { Injectable } from '@angular/core';
import { BaseRecommendationGeneratorService } from './base-lense-recommender.service';
import { LenseIds } from 'src/app/model/lense-ids.enum';

@Injectable({
  providedIn: 'root'
})
export class ParsonsRGS extends BaseRecommendationGeneratorService {

  constructor() { 
    super(LenseIds.PARSONS)
  }
}