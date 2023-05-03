import * as vscode from 'vscode';

export class BaseController {
    protected view: vscode.Webview;
    private handlers: {command: string; callback: (msg: any) => void}[];
    constructor(view: vscode.Webview) {
        this.view = view;
        this.handlers = [];
        view.onDidReceiveMessage((msg) => {
            const handler = this.handlers.find(h => h.command === msg.command);
            if (!handler) {
                return;
            }
            handler.callback(msg);
        })
    }

    registerHandler(command: string, callback:  (msg: any) => void) {
        this.handlers.push({command, callback});
    }


}