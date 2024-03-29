import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VSCodeCommunicationService {
  vscode: any;
  constructor() {
    this.vscode = (window as any).acquireVsCodeApi();
   }

  sendMessage(command: string, msg: any) {
    this.vscode.postMessage({
      ...msg,
      command
    })
  }

  showNotification(message: string, type: 'error' | 'info') {
    this.vscode.postMessage({
      command: 'showNotification',
      type,
      message
    });
  }
}
