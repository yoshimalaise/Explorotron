import { Injectable } from '@angular/core';
import { LenseIds } from '../model/lense-ids.enum';
import { StudyTour } from '../model/study-tour.interface';
import { Session } from '../model/session.interface';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public sourceCode: string = debuggingFallbackJS;
  public lenseSpecificData: any = undefined;
  public currentLense: LenseIds = LenseIds.CODE_QUESTIONS;// LenseIds.LOADING;
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
function selectionSort(arr) {
  let min;
  //start passes.
  for (let i = 0; i < arr.length; i++) {
    //index of the smallest element to be the ith element.
    min = i;
    //Check through the rest of the array for a lesser element
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    //compare the indexes
    if (min !== i) {
      //swap
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
  }
  return arr;
}
const fac = (n) => n ? n * fac(n - 1) : 1;
  fac(6);
`;