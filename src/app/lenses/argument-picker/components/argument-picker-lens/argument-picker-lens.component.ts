import { Component, Input, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-argument-picker-lens',
  templateUrl: './argument-picker-lens.component.html',
  styleUrls: ['./argument-picker-lens.component.scss']
})
export class ArgumentPickerLensComponent {
  @Input() code: string;

  constructor(private _snackBar: MatSnackBar) {

  }

  ngAfterViewInit(): void {
    this.generateExercise(this.code);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.generateExercise(changes.code.currentValue);
  }

  generateExercise(code: string) {

  }
}
