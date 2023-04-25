import { LenseIds } from "./lense-ids.enum";

export interface Session {
    exercises: SessionExercise[]
}

export interface SessionExercise {
    lens: LenseIds;
    file: string;
    sourceCode: string
}