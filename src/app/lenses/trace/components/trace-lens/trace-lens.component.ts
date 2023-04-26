import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trace-lens',
  templateUrl: './trace-lens.component.html',
  styleUrls: ['./trace-lens.component.scss']
})
export class TraceLensComponent {

  @Input() code: string;
  
}
