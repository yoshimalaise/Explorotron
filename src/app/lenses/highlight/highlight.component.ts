import { Component } from '@angular/core';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent {
  selectedColor: 'white' | 'red' | 'blue' | 'orange' | 'purple' = 'white';

  clear() {

  }

  print() {
    
  }
}
