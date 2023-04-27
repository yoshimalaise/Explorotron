import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stack-lens',
  templateUrl: './stack-lens.component.html',
  styleUrls: ['./stack-lens.component.scss']
})
export class StackLensComponent {
  @Input() code: string;
  editorOptions = {theme: 'vs-dark', language: 'javascript'};

  constructor() {}

  ngAfterViewInit(): void {
    this.generateStackHistory(this.code);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.generateStackHistory(changes.code.currentValue);
  }

  generateStackHistory(code: string){
    
  }

}
