import * as vscode from 'vscode';
import { BaseController } from './base-controller';
import * as fs from 'fs';

export class QuizController extends BaseController {
    constructor(view: vscode.Webview) {
        super(view);
        this.registerHandler('saveQuiz', this.saveQuiz.bind(this));
    }

    saveQuiz(msg: any) {
        if (vscode.workspace && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) {
            try {
                const quiz = msg.quiz;
                const path = `${vscode.workspace.workspaceFolders[0].uri.fsPath}/${quiz.fileName}`;
                fs.writeFileSync(path, JSON.stringify(quiz));
                vscode.window.showInformationMessage("File saved successfully");
            } catch (err: any) {
                vscode.window.showErrorMessage(err.toString());
            }
        }
    }
}