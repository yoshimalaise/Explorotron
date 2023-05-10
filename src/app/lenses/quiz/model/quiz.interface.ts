export interface Quiz {
    name: string;
    fileName: string;
    questions: QuizQuestion[];
}

export interface QuizQuestion {
    question: string;
    codeSnippet: string;
    type: QuizQuestionType
}

export interface SingleAnswerQuestion extends QuizQuestion {
    answers: SingleAnswer[];
}

export interface MultipleAnswerQuestion extends QuizQuestion {
    answers: MultipleAnswer[];
}

export interface SingleAnswer {
    isCorrect: boolean;
    answer: string;
}

export interface MultipleAnswer {
    isCorrect: boolean;
    answer: string;
    isSelected?: boolean;
}

export enum QuizQuestionType {
    SINGLE_ANSWER = "SingleAnswer",
    MULTIPLE_ANSWER = "MultipleAnswer"
}
export const quizQuestionTypes = [QuizQuestionType.MULTIPLE_ANSWER, QuizQuestionType.SINGLE_ANSWER]