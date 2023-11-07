const { opendir, readFile } = require('fs/promises');
const { join } = require('path');
import * as parser from "@babel/parser";
const _traverse = require("@babel/traverse");
const traverse = _traverse.default;
const Path = require("path");
const FS   = require("fs");

let ignoreList: string[] = [];

/**
 * this  file is very much  based on https://github.com/lpmi-13/code-corpus-collector/blob/main/javascript/extractFunctions.js
 */
export class FunctionExporterService {

  /** Find function definitions from a js file string */
  extractFunctions(code: string) {
    try {
      const fns: any[] = []
      const ast = parser.parse(code, { sourceType: "module" })
  
      traverse(ast, {
        enter({ node: { type, start, end } }: any) {
          if (type === 'FunctionDeclaration') {
            fns.push(code.slice(start, end))
          }
        }
      })
  
      return fns;
    } catch {
      return []
    }
  }

  getAllFilePaths(repoPath: string){
    let filePaths: string[] = [];
    FS.readdirSync(repoPath).forEach((file: any) => {
      const absolutePath = Path.join(repoPath, file);
      // we ignore all paths container something from the ignorelist
      const stop = ignoreList.some((ign: any) => absolutePath.includes(ign))
      if (stop){
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

  getAllJsFilePaths(repoPath: string){
    return this.getAllFilePaths(repoPath).filter(p => p.endsWith('.js'));
  }

  async grabFunctions(repoPath: string, _ignoreList: string[]) {
    const functionObjects = [];
    ignoreList = _ignoreList;

    const filePaths = this.getAllJsFilePaths(repoPath);

    for (let f of filePaths) {
      const filePath = f.split('/');
      const name = filePath[filePath.length - 1];
      const buffer = await readFile(f)
      const code = buffer.toString();
      
      for (const fn of this.extractFunctions(code)) {
        const functionLines = fn.split('\n');
        functionObjects.push({
          "filename": name,
          "type": 'function',
          "total_lines": functionLines.length,
            "lines": functionLines.map((fn: any, i: any) => {
               return {"line_number": i+1, "line_content": fn}
            }),
          "leitner_box": 1
        });
      }
    }
    return functionObjects;
  }
}