import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.scss']
})
export class FileBrowserComponent {
  @Input() entry: any;
  @Output() selected = new EventEmitter<any>();
  showChildren: boolean = false;

  toggle() {
    this.showChildren = !this.showChildren;
  }

  handleClick() {
    if (this.entry.children && this.entry.children.length > 0) {
      return this.toggle();
    }
    this.selected.emit(this.entry);
  }

  bubbleUp(e: any) {
    this.selected.emit(e);
  }
}
