import * as vscode from 'vscode';
import { QuizController } from './quiz-controller';
import { TourController } from './tour-controller';

export function registerControllers(webview: vscode.Webview) {
    new QuizController(webview);
    new TourController(webview);
}