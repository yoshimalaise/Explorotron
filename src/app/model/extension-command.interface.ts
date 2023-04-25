import { LenseIds } from "./lense-ids.enum";
import { Session } from "./session.interface";
import { StudyTour } from "./study-tour.interface";

export interface ExtensionCommand {
    command: CommandType;
    sourceCode?: string;
    lenseId?: LenseIds;
    tour?: StudyTour;
    workspace?: any;
    root?: string;
    session?: Session
}

export enum CommandType {
    LOAD_PLUGIN = "LoadPlugin",
    EDIT_STUDY_TOUR  = "editStudyTour",
    LOAD_TOUR_OVERVIEW = "loadTourOverview",
    START_TOUR = "startTour"
}