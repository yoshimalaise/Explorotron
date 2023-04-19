import { Injectable } from '@angular/core';
import { LenseIds } from '../model/lense-ids.enum';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public sourceCode: string = debuggingFallbackJS;
  public currentLense: LenseIds =  LenseIds.LOADING;

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
console.log(selectionSort([29, 72, 98, 13, 87, 66, 52, 51, 36]));
`;