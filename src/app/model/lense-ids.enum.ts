export enum LenseIds {
    LOADING = "Loading",
    ANNOTATE = "Annotate",
    FLOWCHART = "Flowchart",
    PRESENTATION = 'Presentation',
    PICK_FLOWCHART= "PickFlowchart",
    PARSONS = "Parsons",
    PSEUDIFY = "Pseudify",
    COMMENT_SLOTS = "CommentSlots",
    ARGUMENT_PICKER = "ArgumentPicker",
    BLANKS = "Blanks",
    EDIT_STUDY_TOUR = "EditStudyTour",
    TOUR_OVERVIEW = "TourOverview"
}

export const AVAILABLE_LENSES = [
    LenseIds.ANNOTATE, LenseIds.FLOWCHART, LenseIds.PRESENTATION, LenseIds.PICK_FLOWCHART,
    LenseIds.PARSONS, LenseIds.PSEUDIFY, LenseIds.COMMENT_SLOTS, LenseIds.ARGUMENT_PICKER,
    LenseIds.BLANKS
];