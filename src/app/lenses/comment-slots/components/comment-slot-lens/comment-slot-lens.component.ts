import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-comment-slot-lens',
  templateUrl: './comment-slot-lens.component.html',
  styleUrls: ['./comment-slot-lens.component.scss']
})
export class CommentSlotLensComponent {

  @Input() code: string;
  

  constructor() {}

  ngAfterViewInit(): void {
    this.generateSlots(this.code);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.generateSlots(changes.code.currentValue);
  }

  generateSlots(code: string) {

  }
  
}
