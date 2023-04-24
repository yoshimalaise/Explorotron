import { LenseIds } from "./lense-ids.enum";
import { StudyTour } from "./study-tour.interface";

export interface ExtensionCommand {
    command: CommandType;
    sourceCode?: string;
    lenseId?: LenseIds;
    tour?: StudyTour
}

export enum CommandType {
    LOAD_PLUGIN = "LoadPlugin",
    EDIT_STUDY_TOUR  = "editStudyTour"
}