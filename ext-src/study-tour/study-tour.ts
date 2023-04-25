import * as vscode from "vscode";
import * as fs from 'fs';
import * as path from 'path';
import { CustomReadonlyEditorProvider } from "vscode";
import * as dirTree from 'directory-tree';

export async function createTour() {
    const tourName = await vscode.window.showInputBox();
    if (!tourName) {
        throw new Error("Please provide a valid name");
    }
    try {
        if (vscode.workspace && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) {
            let path = vscode.workspace.workspaceFolders[0].uri.fsPath;
            const fileName = `${tourName.replace(/ /g, "_")}.study-tour`;
            const dummyTour = {
                tourName,
                fileName,
                description: "",
                exercises: []
            }
            fs.writeFileSync(`${path}/${fileName}`, JSON.stringify(dummyTour));
            return dummyTour;
        } else {
            throw new Error("Command needs to be ran in a workspace");
        }

    } catch (err) {
        console.log(err);
        throw new Error("Could not create tour file");
    }
}

export class StudyTourViewer implements vscode.CustomTextEditorProvider {
    private readonly extensionPath: string;
    private readonly builtAppFolder: string;
    public static readonly viewType = "study.lenses.viewTour";

    constructor(extensionPath: string) {
        this.extensionPath = extensionPath;
        this.builtAppFolder = 'dist';
    }

    resolveCustomTextEditor(document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel, token: vscode.CancellationToken): void | Thenable<void> {
        webviewPanel.webview.options = {
			enableScripts: true,
            // And restrict the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [vscode.Uri.file(path.join(this.extensionPath, this.builtAppFolder))]
		};
        webviewPanel.webview.html = this._getHtmlForWebview(webviewPanel);
        setTimeout(() => {
            if (vscode.workspace && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0]) {
                const t = JSON.parse(document.getText());
                const root = vscode.workspace.workspaceFolders[0].uri.fsPath;
                webviewPanel.webview.postMessage({ command: 'loadTourOverview', tour: t, workspace:  dirTree(root), root});
            }
          }, 1000);

        this._registerEvents(webviewPanel);
    }
    
    private _getHtmlForWebview(panel: vscode.WebviewPanel): string {
        // path to dist folder
        const appDistPath = path.join(this.extensionPath, 'dist');
        const appDistPathUri = vscode.Uri.file(appDistPath);
    
        // path as uri
        const baseUri = panel.webview.asWebviewUri(appDistPathUri);
    
        // get path to index.html file from dist folder
        const indexPath = path.join(appDistPath, 'index.html');
    
        // read index file from file system
        let indexHtml = fs.readFileSync(indexPath, { encoding: 'utf8' });
    
        // update the base URI tag
        indexHtml = indexHtml.replace('<base href="/">', `<base href="${String(baseUri)}/">`);
    
        return indexHtml;
      }

      private _registerEvents(panel: vscode.WebviewPanel) {
        panel.webview.onDidReceiveMessage((msg) => {
            if (msg.command === "startSession") {
              try {
                const tour = msg.tour;

                const sessionExercises = tour.exercises.map((e: any) => {
                    if (vscode.workspace && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) {
                        return {
                            ...e,
                            sourceCode: fs.readFileSync(`${vscode.workspace.workspaceFolders[0].uri.fsPath}${e.file}`, {encoding:'utf8', flag:'r'}),
                            isCompleted: false
                        }
                    }
                });
                const session = { exercises: sessionExercises, name: msg.tour.tourName }
                panel.webview.postMessage({ command: 'startTour', session});
              } catch (err: any) {
                vscode.window.showErrorMessage(err.toString());
              } 
            }
          });
      }
}