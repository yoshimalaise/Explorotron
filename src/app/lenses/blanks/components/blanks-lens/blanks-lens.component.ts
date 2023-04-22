import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-blanks-lens',
  templateUrl: './blanks-lens.component.html',
  styleUrls: ['./blanks-lens.component.scss']
})
export class BlanksLensComponent {
  @Input() code: string;
  blankCode: string;

  constructor() {}

  ngAfterViewInit(): void {
    this.generateBlankCode(this.code);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.generateBlankCode(changes.code.currentValue);
  }

  generateBlankCode(code: string){
    
  }
}
