import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-parsons-jslens',
  templateUrl: './parsons-jslens.component.html',
  styleUrls: ['./parsons-jslens.component.scss']
})
export class ParsonsJSLensComponent implements AfterViewInit {
 
  @Input() code: string; 
  @ViewChild('sortableTrash') sortableTrash;
  @ViewChild('sortable') sortableCode;
  parson: any;

  constructor (private sessionService: SessionService) {}

  ngAfterViewInit(): void {
    this.parson = new (window as any).ParsonsWidget({
      'sortableId': 'sortable',
      'trashId': 'sortableTrash',
      'max_wrong_lines': 1,
      'feedback_cb' : (fb) => this.showFeedback(fb),
    });
    this.parson.init(this.code);
    this.parson.shuffleLines();
  }

  showFeedback(fb: any) {
    if (fb.success) {
      this.sessionService.markExercixeComplete();
      return;
    }
    console.log('Feedback: ', fb);
  }

  getFeedback() {
    this.parson.getFeedback();
  }
}
