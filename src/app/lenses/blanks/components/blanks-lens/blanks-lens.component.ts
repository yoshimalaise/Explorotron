import { Component, Input, SimpleChanges } from '@angular/core';
import { BlanksConfig } from '../../model/blanks-config.interface';

@Component({
  selector: 'app-blanks-lens',
  templateUrl: './blanks-lens.component.html',
  styleUrls: ['./blanks-lens.component.scss']
})
export class BlanksLensComponent {
  @Input() code: string;
  blankCode: string;

  blanksConfig: BlanksConfig = {
    difficulty: 0.5,
    identifiers: true,
    keywords: true,
    primitives: false,
    operators: false,
    finishedConfig: false
  }

  // see: https://www.npmjs.com/package/ngx-monaco-editor
  editorOptions = {theme: 'vs-dark', language: 'javascript'};


  constructor() {}

  ngAfterViewInit(): void {
    this.blanksConfig.finishedConfig = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.blanksConfig.finishedConfig = false;
  }

  generateBlankCode(){
    this.blanksConfig.finishedConfig = true;
  }
}
