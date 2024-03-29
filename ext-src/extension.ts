import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { analyse, readSourceCode } from './code-analyser/code-analyser';
import { StudyTourViewer, createTour } from './study-tour/study-tour';
import * as dirTree from 'directory-tree';
import { createQuiz, QuizViewer } from './quizzes/quiz';
import { registerControllers } from './controllers';
import { exportPhoneExercises } from './app-export/app-export';

/**
 * Manages webview panels
 */
export class WebPanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: WebPanel | undefined;

  public static context: vscode.ExtensionContext | undefined;

  private static readonly viewType = 'angular';

  private readonly panel: vscode.WebviewPanel;
  private readonly extensionPath: string;
  private readonly builtAppFolder: string;
  private disposables: vscode.Disposable[] = [];

  public static loadContext(context: vscode.ExtensionContext) {
    WebPanel.context = context;
  }

  public static createOrShow(extensionPath: string) {
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

    // If we already have a panel, show it.
    // Otherwise, create angular panel.
    /*
    if (WebPanel.currentPanel) {
      WebPanel.currentPanel.panel.reveal(column);
    } else {
      WebPanel.currentPanel = new WebPanel(extensionPath, column || vscode.ViewColumn.One);
      registerControllers(WebPanel.currentPanel.panel.webview, extensionPath);
    }*/
    // for now temporarily always return a new panel
    WebPanel.currentPanel = new WebPanel(extensionPath, column || vscode.ViewColumn.Beside);
    registerControllers(WebPanel.currentPanel.panel.webview, extensionPath);

    // register handlers
    /*
    if (WebPanel.currentPanel && WebPanel.currentPanel.panel && WebPanel.currentPanel.panel.webview) {
      WebPanel.currentPanel.panel.webview.onDidReceiveMessage((msg) => {
        if (msg.command === "saveTour" && vscode.workspace && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) {
          try {
            const tour = msg.tour;
            const path = `${vscode.workspace.workspaceFolders[0].uri.fsPath}/${tour.fileName}`;
            fs.writeFileSync(path, JSON.stringify(tour)); 
            vscode.window.showInformationMessage("File saved successfully");
          } catch (err: any) {
            vscode.window.showErrorMessage(err.toString());
          } 
        }
      });
    }*/


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
      localResourceRoots: [vscode.Uri.file(path.join(this.extensionPath, this.builtAppFolder))],

      retainContextWhenHidden: true
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
        const code = resource?.fsPath === undefined ? undefined : readSourceCode(resource.fsPath);
        const p = WebPanel.createOrShow(context.extensionPath);
        setTimeout(() => {
            if (messageBody.title) {
              p.panel.title = messageBody.title;
            }
            
            p.panel.webview.postMessage({ ...messageBody, sourceCode: code });
        }, 1000);
      })
    );
  }

  public static registerStudyTours(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.commands.registerCommand('study.lenses.create-study-tour', async () => {
        try {
          const t = await createTour();
          const p = WebPanel.createOrShow(context.extensionPath);
          setTimeout(() => {
            if (vscode.workspace && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) {
              const root = vscode.workspace.workspaceFolders[0].uri.fsPath;
              p.panel.title = "Study tour";
              p.panel.webview.postMessage({ command: 'editStudyTour', tour: t, workspace: dirTree(root), root });
            }
          }, 1000);
        } catch {
          vscode.window.showErrorMessage("Please provide a valid name");
        }
      })
    );

    context.subscriptions.push(
      vscode.commands.registerCommand('study.lenses.edit-study-tour', (resource: vscode.Uri) => {
        const t = JSON.parse(readSourceCode(resource.fsPath));
        const p = WebPanel.createOrShow(context.extensionPath);
        setTimeout(() => {
          if (vscode.workspace && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) {
            const root = vscode.workspace.workspaceFolders[0].uri.fsPath;
            p.panel.title = "Study tour";
            p.panel.webview.postMessage({ command: 'editStudyTour', tour: t, workspace: dirTree(root), root });
          }
        }, 1000);

      })
    );
  }

  public static registerQuizzes(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.commands.registerCommand('study.lenses.create-quiz', async () => {
        try {
          const q = await createQuiz();
          const p = WebPanel.createOrShow(context.extensionPath);
          setTimeout(() => {
            if (vscode.workspace && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) {
              p.panel.webview.postMessage({ command: 'LoadPlugin', lenseId: 'QuizEditor', lenseSpecificData: q });
              p.panel.title = "Quizzes";
            }
          }, 1000);
        } catch {
          vscode.window.showErrorMessage("Please provide a valid name");
        }
      })
    );

    context.subscriptions.push(
      vscode.commands.registerCommand('study.lenses.edit-quiz', (resource: vscode.Uri) => {
        const q = JSON.parse(readSourceCode(resource.fsPath));
        const p = WebPanel.createOrShow(context.extensionPath);
        setTimeout(() => {
          if (WebPanel.currentPanel && WebPanel.currentPanel.panel && WebPanel.currentPanel.panel.webview
            && vscode.workspace && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) {
            p.panel.webview.postMessage({ command: 'LoadPlugin', lenseId: 'QuizEditor', lenseSpecificData: q });
          }
        }, 1000);
      })
    );

    context.subscriptions.push(
      vscode.commands.registerCommand('study.lenses.start-quiz', (resource: vscode.Uri) => {
        const q = JSON.parse(readSourceCode(resource.fsPath));
        const p = WebPanel.createOrShow(context.extensionPath);
        setTimeout(() => {
          if (WebPanel.currentPanel && WebPanel.currentPanel.panel && WebPanel.currentPanel.panel.webview
            && vscode.workspace && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) {
              p.panel.title = "Quizzes";
              p.panel.webview.postMessage({ command: 'LoadPlugin', lenseId: 'Quiz', lenseSpecificData: q });
          }
        }, 1000);
      })
    );
  }

  public static registerMobileExport(context: vscode.ExtensionContext) {
    // 'study.lenses.export-mobile-exercises'
    context.subscriptions.push(
      vscode.commands.registerCommand('study.lenses.export-mobile-exercises', async () => {
        if (vscode.workspace && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) {
          const externalUrlQr = await exportPhoneExercises(vscode.workspace.workspaceFolders[0].uri.fsPath);
          const p = WebPanel.createOrShow(context.extensionPath);
          setTimeout(() => {
              p.panel.title = "Mobile exercise export";
              p.panel.webview.postMessage({ command: 'LoadPlugin', lenseId: 'MobileExport', lenseSpecificData: { externalUrlQr }, title: 'Mobile export' });
          }, 1000);
        }
      })
    );
  }
}

/**
 * Activates extension
 * @param context vscode extension context
 */
export function activate(context: vscode.ExtensionContext) {
  WebPanel.loadContext(context);
  /*
  context.subscriptions.push(
    vscode.commands.registerCommand('study.lenses.start', (resource: vscode.Uri) => {
      analyse(resource.fsPath);
      const p = WebPanel.createOrShow(context.extensionPath);
      p.panel.postMessage({ command: 'refactor' });
    })
  );
  */
  WebPanel.registerLense(context, 'study.lenses.annotate', { command: 'LoadPlugin', lenseId: 'Annotate', title: 'Annotate' });
  WebPanel.registerLense(context, 'study.lenses.present', { command: 'LoadPlugin', lenseId: 'Presentation', title: 'Presentation' });
  WebPanel.registerLense(context, 'study.lenses.flowchart', { command: 'LoadPlugin', lenseId: 'Flowchart', title: 'Flowchart' });
  WebPanel.registerLense(context, 'study.lenses.pick-flowchart', { command: 'LoadPlugin', lenseId: 'PickFlowchart', title: 'Pick Flowchart' });
  WebPanel.registerLense(context, 'study.lenses.parsons', { command: 'LoadPlugin', lenseId: 'Parsons', title: 'Parsons' });
  WebPanel.registerLense(context, 'study.lenses.pseudify', { command: 'LoadPlugin', lenseId: 'Pseudify', title: 'Pseudify' });
  WebPanel.registerLense(context, 'study.lenses.comment-slots', { command: 'LoadPlugin', lenseId: 'CommentSlots', title: 'Comment Slots' });
  WebPanel.registerLense(context, 'study.lenses.argument-picker', { command: 'LoadPlugin', lenseId: 'ArgumentPicker', title: 'Argument Picker' });
  WebPanel.registerLense(context, 'study.lenses.blanks', { command: 'LoadPlugin', lenseId: 'Blanks', title: 'Blanks' });
  WebPanel.registerLense(context, 'study.lenses.trace', { command: 'LoadPlugin', lenseId: 'Trace', title: 'Trace' });
  WebPanel.registerLense(context, 'study.lenses.code-questions', { command: 'LoadPlugin', lenseId: 'CodeQuestions', title: 'Code Questions' });

  vscode.window.registerCustomEditorProvider(StudyTourViewer.viewType, new StudyTourViewer(context.extensionPath));
  vscode.window.registerCustomEditorProvider(QuizViewer.viewType, new QuizViewer(context.extensionPath));

  WebPanel.registerStudyTours(context);
  WebPanel.registerQuizzes(context);

  WebPanel.registerLense(context, 'study.lenses.show-recommended-lenses', { command: 'LoadPlugin', lenseId: 'SuggestedLenses', title: 'Suggested Lenses' });
  WebPanel.registerLense(context, 'study.lenses.open-in-suggested-lens', { command: 'LoadPlugin', lenseId: 'OpenInSuggestedLens' });
  WebPanel.registerLense(context, 'study.lenses.open-suggested-tour', { command: 'LoadPlugin', lenseId: 'OpenSuggestedTour', title: 'Suggested Tour' });
  WebPanel.registerLense(context, 'study.lenses.show-micromaterials', { command: 'LoadPlugin', lenseId: 'Micromaterials', title: 'Micromaterials' });
  WebPanel.registerMobileExport(context);
}
