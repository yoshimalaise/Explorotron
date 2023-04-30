import { Injectable } from '@angular/core';
import { LenseIds } from '../model/lense-ids.enum';
import { StudyTour } from '../model/study-tour.interface';
import { Session } from '../model/session.interface';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public sourceCode: string = debuggingFallbackJS;
  public currentLense: LenseIds = LenseIds.STACK;// LenseIds.LOADING;
  public isTour: boolean = false;
  public studyTour?: StudyTour = undefined;
  public workspace?: any = undefined;
  public root: string = "";
  public session: Session = undefined;
  public currentExerciseIndex: number = 0;
  constructor() { }
}

/**
 * This string is used as the default program code for when interactively developing using ng serve instead of the vscode plugin build cycle
 */
const debuggingFallbackJS = `
function fizz(x, y) {
  return x * y;
}
function bar(x) {
  if (x <= 1) {
    return 1;
  }
  return x * bar(x - 1);
}

function foo(n) {
  return bar(n) + fizz(n * 2, n * 3) + bar(n - 1);
}

foo(3);
`;