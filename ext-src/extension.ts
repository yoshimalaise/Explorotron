import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { analyse, readSourceCode } from './code-analyser/code-analyser';

/**
 * Manages webview panels
 */
class WebPanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: WebPanel | undefined;

  private static readonly viewType = 'angular';

  private readonly panel: vscode.WebviewPanel;
  private readonly extensionPath: string;
  private readonly builtAppFolder: string;
  private disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionPath: string) {
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

    // If we already have a panel, show it.
    // Otherwise, create angular panel.
    if (WebPanel.currentPanel) {
      WebPanel.currentPanel.panel.reveal(column);
    } else {
      WebPanel.currentPanel = new WebPanel(extensionPath, column || vscode.ViewColumn.One);
    }
    return WebPanel.currentPanel;
  }

  private constructor(extensionPath: string, column: vscode.ViewColumn) {
    this.extensionPath = extensionPath;
    this.builtAppFolder = 'dist';

    // Create and show a new webview panel
    this.panel = vscode.window.createWebviewPanel(WebPanel.viewType, 'Study Lenses', column, {
      // Enable javascript in the webview
      enableScripts: true,

      // And restrict the webview to only loading content from our extension's `media` directory.
      localResourceRoots: [vscode.Uri.file(path.join(this.extensionPath, this.builtAppFolder))]
    });

    // Set the webview's initial html content
    this.panel.webview.html = this._getHtmlForWebview();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

    // Handle messages from the webview
    this.panel.webview.onDidReceiveMessage(
      (message: any) => {
        switch (message.command) {
          case 'alert':
            vscode.window.showErrorMessage(message.text);
            return;
        }
      },
      null,
      this.disposables
    );
  }

  public dispose() {
    WebPanel.currentPanel = undefined;

    // Clean up our resources
    this.panel.dispose();

    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  /**
   * Returns html of the start page (index.html)
   */
  private _getHtmlForWebview() {
    // path to dist folder
    const appDistPath = path.join(this.extensionPath, 'dist');
    const appDistPathUri = vscode.Uri.file(appDistPath);

    // path as uri
    const baseUri = this.panel.webview.asWebviewUri(appDistPathUri);

    // get path to index.html file from dist folder
    const indexPath = path.join(appDistPath, 'index.html');

    // read index file from file system
    let indexHtml = fs.readFileSync(indexPath, { encoding: 'utf8' });

    // update the base URI tag
    indexHtml = indexHtml.replace('<base href="/">', `<base href="${String(baseUri)}/">`);

    return indexHtml;
  }

  public static registerLense(context: vscode.ExtensionContext, command: string, messageBody: any) {
    context.subscriptions.push(
      vscode.commands.registerCommand(command, (resource: vscode.Uri) => {
        // analyse(resource.fsPath);
        const code = readSourceCode(resource.fsPath);
        WebPanel.createOrShow(context.extensionPath);
        setTimeout(() => {
          if (WebPanel.currentPanel && WebPanel.currentPanel.panel && WebPanel.currentPanel.panel.webview) {
            WebPanel.currentPanel.panel.webview.postMessage({...messageBody, sourceCode: code});
          }
        }, 1000);
      })
    );
  }
}

/**
 * Activates extension
 * @param context vscode extension context
 */
export function activate(context: vscode.ExtensionContext) {
  /*
  context.subscriptions.push(
    vscode.commands.registerCommand('study.lenses.start', (resource: vscode.Uri) => {
      analyse(resource.fsPath);
      const p = WebPanel.createOrShow(context.extensionPath);
      p.panel.postMessage({ command: 'refactor' });
    })
  );
  */
  WebPanel.registerLense(context, 'study.lenses.annotate', { command: 'LoadPlugin', lenseId: 'Annotate' });
  WebPanel.registerLense(context, 'study.lenses.present', { command: 'LoadPlugin', lenseId: 'Presentation' });
  WebPanel.registerLense(context, 'study.lenses.flowchart', { command: 'LoadPlugin', lenseId: 'Flowchart' });
  WebPanel.registerLense(context, 'study.lenses.pick-flowchart', { command: 'LoadPlugin', lenseId: 'PickFlowchart' });
  WebPanel.registerLense(context, 'study.lenses.parsons', { command: 'LoadPlugin', lenseId: 'Parsons' });
  WebPanel.registerLense(context, 'study.lenses.pseudify', { command: 'LoadPlugin', lenseId: 'Pseudify' });
  WebPanel.registerLense(context, 'study.lenses.comment-slots', { command: 'LoadPlugin', lenseId: 'CommentSlots' });
}
