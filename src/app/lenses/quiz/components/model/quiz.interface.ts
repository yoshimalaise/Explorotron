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

export enum QuizQuestionType {
    SINGLE_ANSWER = "SingleAnswer",
    MULTIPLE_ANSWER = "MultipleAnswer"
}
export const quizTypes = [QuizQuestionType.MULTIPLE_ANSWER, QuizQuestionType.SINGLE_ANSWER]