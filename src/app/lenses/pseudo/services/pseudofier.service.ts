import { Injectable } from '@angular/core';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';
import { generate, baseGenerator } from '../utils/astring';
import * as pseudoGenerator from '../utils/pseudo-generator';

@Injectable({
  providedIn: 'root'
})
export class PseudofierService {
  constructor() { }

  public pseudofy(code: string): string {
    const ast = acorn.parse(code, { ecmaVersion: 9 });
    const customGenerator = Object.assign(
      {},
      baseGenerator,
      pseudoGenerator,
    );

    let pseudoCode = generate(ast, {
      generator: customGenerator,
    });

    const splitPseudoCode = pseudoCode
      .split('\n')
      .filter((line) => line.trim() !== '');

    const finalPseudoCodeLines = [];
    for (let i = 0; i < splitPseudoCode.length; i++) {
      const line = splitPseudoCode[i];
      const nextLine = splitPseudoCode[i + 1];
      if (
        line &&
        nextLine &&
        !line.startsWith(' ') &&
        !nextLine.startsWith(' ')
      ) {
        finalPseudoCodeLines.push(line + '\n');
      } else {
        finalPseudoCodeLines.push(line);
      }
    }

    return finalPseudoCodeLines.join("\n");
  }

}
