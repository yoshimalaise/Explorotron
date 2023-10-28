import * as vscode from 'vscode';
import { BaseController } from "./base-controller";

export class OpenWebpageController extends BaseController {

    constructor(view: vscode.Webview) {
        super(view);
        this.registerHandler('openWebpage', this.openWebpage.bind(this));
    }

    openWebpage(msg: any) {
        if (!msg.url) {
            return
        }

        let start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
        require('child_process').exec(start + ' ' + msg.url);
    }
}