import { Component, Input, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';
import { PickFlowChartEntry } from '../../model/pick-flowchart-entry.interface';
import { AlternativeGeneratorService } from '../../services/alternative-generator.service';

@Component({
  selector: 'app-pickflow-chart-lens',
  templateUrl: './pickflow-chart-lens.component.html',
  styleUrls: ['./pickflow-chart-lens.component.scss']
})
export class PickflowChartLensComponent {
  @Input() code: string;
  entries: PickFlowChartEntry[] = [];

  constructor(private service:  AlternativeGeneratorService, private _snackBar: MatSnackBar, private sessionService: SessionService) {

  }

  ngAfterViewInit(): void {
    this.generateAlternatives(this.code);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.generateAlternatives(changes.code.currentValue);
  }

  generateAlternatives(code: string) {
    const alernatives: PickFlowChartEntry[] = this.service.generateVariations(code, 2).map(code => ({isCorrect: false, code}));
    this.entries = [{ isCorrect: true, code}, ...alernatives].sort(() => Math.random() - 0.5);
    console.log("entries", this.entries);
  }

  select(entry: PickFlowChartEntry) {
    if (entry.isCorrect) {
      this.sessionService.markExercixeComplete();
    } else {
      this._snackBar.open('Unfortunately that answer was incorrect, try again!');
    }
  }
}
