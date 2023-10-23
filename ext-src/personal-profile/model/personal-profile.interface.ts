export interface PersonalProfile {
    lensUsageCounter: { [index: string]: number };
    actions: UserAction[];
}

export interface UserAction {
    timeStamp: string;
    lens?: string; //lens Id
    actionType: UserActionType;
}

export enum UserActionType {
    OPEN_LENS = "OpenLens",
    SOLVED_CORRECTLY = "SolvedCorrectly",
    SOLVED_INCORRECTLY = "SolvedIncorrectly",
}