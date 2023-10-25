import { Injectable } from '@angular/core';
import * as acorn from 'acorn';
import * as generator from 'escodegen';
import * as walk from 'acorn-walk';

@Injectable({
  providedIn: 'root'
})
export class CodeFormattingService {

  constructor() { }

  format(code: string) {
    return generator.generate(acorn.parse(code, { ecmaVersion: 9 }));
  }
}
