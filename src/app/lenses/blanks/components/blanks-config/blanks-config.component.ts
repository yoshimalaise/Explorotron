import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BlanksConfig } from '../../model/blanks-config.interface';

@Component({
  selector: 'app-blanks-config',
  templateUrl: './blanks-config.component.html',
  styleUrls: ['./blanks-config.component.scss']
})
export class BlanksConfigComponent {
  @Input() conf: BlanksConfig;
  @Output() done = new EventEmitter<boolean>();

  finish() {
    this.done.emit(true);
  }
}
