import { Injectable } from '@angular/core';
import { BlanksConfig } from '../model/blanks-config.interface';
import * as acorn from 'acorn';
import * as generator from 'escodegen';
import * as walk from 'acorn-walk';

@Injectable({
  providedIn: 'root'
})
export class BlanksGeneratorService {

  constructor() { }

  generateBlanks(code: string, blanksConfig: BlanksConfig): string {
    const ast = acorn.parse(code, { ecmaVersion: 9 });

    walk.full(ast, (n: any) => {

      if (Math.random() > blanksConfig.difficulty) {
        return
      }

      if (blanksConfig.identifiers && n.type === "Identifier") {
        n.name = "_____";
      }

      if (blanksConfig.operators && n.operator) {
        n.operator = "__";
      }

      if (blanksConfig.primitives && (n.type === "Literal" || n.type === "RegExpLiteral")) {
        n.raw = "____";
      }

      console.log(n);
    });

    return generator.generate(ast);
  }

  compareSnippets(code1: string, code2: string): boolean {
    const c1 = generator.generate(acorn.parse(code1, { ecmaVersion: 9 }));
    const c2 = generator.generate(acorn.parse(code2, { ecmaVersion: 9 }));
    return c1 === c2;
  }

}
