import { opendir, readFile } from 'fs/promises';
const { join } = require('path');
const Path = require("path");
const FS   = require("fs");

export class PresentationExporterService { 

    getAllFilePaths(repoPath: string){
        let filePaths: any = [];
        FS.readdirSync(repoPath).forEach((file: any) => {
          const absolutePath = Path.join(repoPath, file);
          // we ignore all node modules
          if (absolutePath.includes('node_modules')){
            return;
          }
          if (FS.statSync(absolutePath).isDirectory()) {
            filePaths = [...filePaths, ...this.getAllFilePaths(absolutePath)];
          }else {
            filePaths.push(absolutePath);
          } 
        });
        return filePaths;
      }


    getPresentationFilePaths(repoPath: string) {
        return this.getAllFilePaths(repoPath).filter((p: string) => p.endsWith('presentation.md'));
    }
    async getAllPresentations(repoPath: string) {
        const presentations: any = [];
        const presentationPaths = this.getPresentationFilePaths(repoPath);

        for (let f of presentationPaths) {
            const filePath = f.split('/');
            const name = filePath[filePath.length - 1];
            const buffer = await readFile(f)
            const body = buffer.toString();
            presentations.push({
                name,
                body,
                fullPath: f
            });
        }

        return presentations;
    }


}