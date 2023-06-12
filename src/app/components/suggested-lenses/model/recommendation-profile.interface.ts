import { LenseIds } from "src/app/model/lense-ids.enum";

export interface RecommendationProfile {
    score: number;
    lensId: LenseIds;
    primmStage: PRIMMStage
}

export enum PRIMMStage {
    PREDICT = 0,
    RUN = 1,
    INVESTIGATE = 2,
    MODIFY = 3,
    MAKE = 4
}