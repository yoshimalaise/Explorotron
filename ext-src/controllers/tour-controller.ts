import * as vscode from 'vscode';
import { BaseController } from './base-controller';
import * as fs from 'fs';

export class TourController extends BaseController {
    constructor(view: vscode.Webview) {
        super(view);
        this.registerHandler('saveTour', this.saveTour.bind(this));
        this.registerHandler('startSession', this.startSession.bind(this));
    }

    saveTour(msg: any) {
        if (vscode.workspace && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) {
            try {
                const tour = msg.tour;
                const path = `${vscode.workspace.workspaceFolders[0].uri.fsPath}/${tour.fileName}`;
                fs.writeFileSync(path, JSON.stringify(tour));
                vscode.window.showInformationMessage("File saved successfully");
            } catch (err: any) {
                vscode.window.showErrorMessage(err.toString());
            }
        }
    }

    startSession(msg: any) {
        try {
            const tour = msg.tour;

            const sessionExercises = tour.exercises.map((e: any) => {
                if (vscode.workspace && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) {
                    return {
                        ...e,
                        sourceCode: fs.readFileSync(`${vscode.workspace.workspaceFolders[0].uri.fsPath}${e.file}`, { encoding: 'utf8', flag: 'r' }),
                        isCompleted: false
                    }
                }
            });
            const session = { exercises: sessionExercises, name: msg.tour.tourName }
            this.view.postMessage({ command: 'startTour', session });
        } catch (err: any) {
            vscode.window.showErrorMessage(err.toString());
        }
    }
}