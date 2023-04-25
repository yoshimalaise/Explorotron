import { LenseIds } from "./lense-ids.enum";

export interface StudyTour {
    tourName: string;
    fileName: string;
    description: string;
    exercises: TourExercise[]
}

export interface TourExercise {
    lens: LenseIds;
    file: string;
}