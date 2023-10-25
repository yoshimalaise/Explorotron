import * as vscode from 'vscode';
import { BaseController } from './base-controller';

export class NotificationController extends BaseController {
    constructor(view: vscode.Webview) {
        super(view);
        this.registerHandler('showNotification', this.showNotification.bind(this));
    }

    showNotification(msg: any) {
        if (!msg.message) {
            return
        }
        if (msg.type === 'error') {
            vscode.window.showErrorMessage(msg.message);
        } else {
            vscode.window.showInformationMessage(msg.message);
        }
    }
}