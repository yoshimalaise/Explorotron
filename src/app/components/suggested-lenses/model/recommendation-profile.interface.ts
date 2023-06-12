import { LenseIds } from "src/app/model/lense-ids.enum";

export interface RecommendationProfile {
    score: number;
    lensId: LenseIds
}