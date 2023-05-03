import * as vscode from "vscode";
import * as fs from 'fs';
import * as path from 'path';


export class QuizViewer implements vscode.CustomTextEditorProvider {
    private readonly extensionPath: string;
    private readonly builtAppFolder: string;
    public static readonly viewType = "study.lenses.viewQuiz";

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
                const q = JSON.parse(document.getText());
                webviewPanel.webview.postMessage({ command: 'LoadPlugin', lenseId: 'Quiz', lenseSpecificData: q });
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

        });
    }
}