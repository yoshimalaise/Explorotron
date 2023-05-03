export interface QlcjsQuestion {
    question: string;
    options: QlcjsOption[];
    multipleAnswers?: boolean;
}

export interface QlcjsOption {
    answer: string;
    correct: boolean;
    info: string;
    currentlySelected?: boolean;
}