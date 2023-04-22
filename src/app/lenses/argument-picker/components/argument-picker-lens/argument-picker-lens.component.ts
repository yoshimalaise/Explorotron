import { Component, Input, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArgumentPickerServiceService } from '../../services/argument-picker-service.service';
import { APFunction } from '../../model/ap-function.interface';

@Component({
  selector: 'app-argument-picker-lens',
  templateUrl: './argument-picker-lens.component.html',
  styleUrls: ['./argument-picker-lens.component.scss']
})
export class ArgumentPickerLensComponent {
  @Input() code: string;
  functions: APFunction[] = [];

  constructor(private _snackBar: MatSnackBar, private svc: ArgumentPickerServiceService) {

  }

  ngAfterViewInit(): void {
    this.generateExercise(this.code);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.generateExercise(changes.code.currentValue);
  }

  generateExercise(code: string) {
    this.functions = this.svc.generateAPQuestions(code);
    console.log("the code to fill in:", this.functions);
  }
}
