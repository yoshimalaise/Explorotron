import { LenseIds } from "./lense-ids.enum";

export interface Session {
    exercises: SessionExercise[],
    name: string
}

export interface SessionExercise {
    lens: LenseIds;
    file: string;
    sourceCode: string;
    isCompleted: boolean;
}