import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as acorn from 'acorn';
import * as generator from 'escodegen';
import { ParsonsEntry } from '../../models/parsons-entries.interface';

@Component({
  selector: 'app-parsons-lens',
  templateUrl: './parsons-lens.component.html',
  styleUrls: ['./parsons-lens.component.scss']
})
export class ParsonsLensComponent {
  @Input() code: string; 
  entries: ParsonsEntry[] = [];

  constructor(private _snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    this.generateProblem(this.code);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.generateProblem(changes.code.currentValue);
  }

  generateProblem(code: string) {
    const codeWithComments = generator.generate(acorn.parse(code, { ecmaVersion: 9 }));
    const lines = codeWithComments.split("\n");
    let newEntries: ParsonsEntry[] = []
    for (let i = 0; i < lines.length; i++) {
      newEntries.push({ currIndex: i, correctIndex: i, lineCode: lines[i]});
    }
    newEntries = newEntries.sort(() => Math.random() - 0.5);
    for (let i = 0; i < lines.length; i++) {
      newEntries[i].currIndex = i;
    }
    this.entries = newEntries;
  }

  drop(event: any) {
    moveItemInArray(this.entries, event.previousIndex, event.currentIndex);
    for (let i = 0; i < this.entries.length; i++) {
      this.entries[i].currIndex = i;
    }

    for (let i = 0; i < this.entries.length; i++) {
      if (this.entries[i].currIndex !== this.entries[i].correctIndex){
        return
      }
    }

    this._snackBar.open('Good job, you solved the puzzle!');
  }
}
