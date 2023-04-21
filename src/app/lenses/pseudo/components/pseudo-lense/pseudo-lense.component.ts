import { Component, Input, SimpleChanges } from '@angular/core';
import { PseudofierService } from '../../services/pseudofier.service';

@Component({
  selector: 'app-pseudo-lense',
  templateUrl: './pseudo-lense.component.html',
  styleUrls: ['./pseudo-lense.component.scss']
})
export class PseudoLenseComponent {
  @Input() code: string;
  psuedoCode: string;

  constructor(private svc: PseudofierService) {}

  ngAfterViewInit(): void {
    this.generatePseudoCode(this.code);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.generatePseudoCode(changes.code.currentValue);
  }

  generatePseudoCode(code: string){
    this.psuedoCode = this.svc.pseudofy(code);
  }
}
