import { Injectable } from '@angular/core';
import { APFunction } from '../model/ap-function.interface';
import * as acorn from 'acorn';
import * as generator from 'escodegen';
import * as walk from 'acorn-walk';

@Injectable({
  providedIn: 'root'
})
export class ArgumentPickerServiceService {
  constructor() { }

  generateAPQuestions(code: string): APFunction[] {
    const functions = this.extractFunctions(code);
    return functions.map(f => this.generateEntryForFunction(f));
  }

  private extractFunctions(code: string): string[] {
    const functions = [];
    const ast = acorn.parse(code, {ecmaVersion: 9});

    walk.full(ast, n => {
      if (n.type === 'FunctionDeclaration') {
        functions.push(generator.generate(n));
      }
    });
    return functions;
  }

  private generateEntryForFunction(functionCode: string): APFunction {
    const ast: any = acorn.parse(functionCode, {ecmaVersion: 9});
    const params = ast?.body[0].params.map(p => p.name);
    let name = "";

    const innerBodyAst = ast.body[0].body;

    // perform a treewalk and remove all param names from the body
    walk.full(innerBodyAst, (node: any) => {
      if (node.type === 'Identifier' && params.includes(node.name)) {
        node.name = '_______';
      }
      if (node.type === 'FunctionDeclaration') {
        name = node.id.name;
      }
    });
    const sanitisedBody = generator.generate(ast);
    return {
      functionBody: sanitisedBody,
      originalFunctionBody: functionCode,
      arguments: params,
      isComplete: false,
      name
    };
  }
}
