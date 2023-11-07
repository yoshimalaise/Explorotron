import * as vscode from 'vscode';
import { FunctionExporterService } from './fuction-exporter-service';
import { PresentationExporterService } from './presentation-exporter-service';

const PORT = 54321;
let app: any = undefined;
let url: string | undefined = undefined;
let entries: any[] | undefined = undefined;
let serverIsRunning = false;

const fs = require('fs');
const { opendir, readFile } = require('fs/promises');

// code based on https://github.com/yoshimalaise/curriculum-generator/blob/main/state/state.js
let originalIgnoreList = ['node_modules', 'dom-io', 'qs.js', 
                        'libs/', 'lib/', 'assets/', '.min.js',
                        '.reveal.js', '.bundle.js', '.re.js'];
let ignoreList= [...originalIgnoreList];

export async function exportPhoneExercises(workspacePath: string) {
    // lazely initialize server first time the export is called
    if (!serverIsRunning) {
        const express = require('express');
        const cors = require('cors')
        app = express();
        app.use(cors());

        await new Promise((resolve, reject) => {
            app.get('/', function (req: any, res: any) {
                res.json({ entries });
            });

            app.listen(PORT, async (err: string) => {
                if (err) {
                    console.log('failed to start server:', err);
                    vscode.window.showErrorMessage('Could not start server: ' + err);
                } else {
                    vscode.window.showInformationMessage('Server is listening on port: ' + PORT);
                    const localtunnel = require('ngrok');
                    const tunnel = await localtunnel.connect({addr: PORT});
                    url = `${tunnel}`; 
                }
                resolve('ok');
            })
        });
        serverIsRunning = true;
    }

    // perform the logic to set the exercises
    const functionExporterService = new FunctionExporterService();
    const presentationExporterService = new PresentationExporterService();
    const codeObjects = await functionExporterService.grabFunctions(workspacePath, ignoreList);
    const presentations = await presentationExporterService.getAllPresentations(workspacePath);
    entries = [{codeObjects, presentations, name: workspacePath.split("/").pop()}];
    const QRCode = require('qrcode');
    return await QRCode.toDataURL(url);
}