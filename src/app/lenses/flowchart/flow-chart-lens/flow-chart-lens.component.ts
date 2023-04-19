import { Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-flow-chart-lens',
  templateUrl: './flow-chart-lens.component.html',
  styleUrls: ['./flow-chart-lens.component.scss']
})
export class FlowChartLensComponent {
  constructor(public state: StateService) {

  }
}
