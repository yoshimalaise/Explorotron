import * as vscode from 'vscode';
import { QuizController } from './quiz-controller';
import { TourController } from './tour-controller';
import { PersonalProfileController } from './personal-profile-controller';
import { NotificationController } from './notification-controller';

export function registerControllers(webview: vscode.Webview, extentionPath: string) {
    new QuizController(webview);
    new TourController(webview);
    new PersonalProfileController(webview, extentionPath);
    new NotificationController(webview);
}