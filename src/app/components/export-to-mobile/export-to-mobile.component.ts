import { Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-export-to-mobile',
  templateUrl: './export-to-mobile.component.html',
  styleUrls: ['./export-to-mobile.component.scss']
})
export class ExportToMobileComponent {
  constructor(public state: StateService) {}
}
