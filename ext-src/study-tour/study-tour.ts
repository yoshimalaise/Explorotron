import * as vscode from "vscode";
import * as fs from 'fs';

export async function createTour() {
    const tourName = await vscode.window.showInputBox();
    if (!tourName) {
        throw new Error("Please provide a valid name");
    }
    try {
        if (vscode.workspace && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) {
            let path = vscode.workspace.workspaceFolders[0].uri.fsPath;
            const fileName = tourName.replace(/ /g, "_");
            const dummyTour = {
                tourName,
                fileName,
                description: "",
                exercises: []
            }
            fs.writeFileSync(`${path}/${fileName}.study-tour`, JSON.stringify(dummyTour));
        } else {
            throw new Error("Command needs to be ran in a workspace");
        }

    } catch (err) {
        console.log(err);
        throw new Error("Could not create tour file");
    }
    vscode.window.showInformationMessage(tourName);
}