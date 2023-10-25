import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CodeFormattingService } from 'src/app/services/code-formatting.service';
import { SessionService } from 'src/app/services/session.service';
import { VSCodeCommunicationService } from 'src/app/services/vscode-communication.service';


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

  constructor (private sessionService: SessionService, private vsService: VSCodeCommunicationService, private codeFormattingService: CodeFormattingService) {}

  ngAfterViewInit(): void {
    this.parson = new (window as any).ParsonsWidget({
      'sortableId': 'sortable',
      'trashId': 'sortableTrash',
      'max_wrong_lines': 1,
      'feedback_cb' : (fb) => this.showFeedback(fb),

    });

    try {
      this.parson.init(this.code);
      this.parson.shuffleLines();
    } catch {
      // the js-parsons library doesn't like it when whitespace is inconsistent if we get an
      // regenerate the code from the ast
      this.parson.init(this.codeFormattingService.format(this.code));
      this.parson.shuffleLines();
    }
  }

  showFeedback(fb: any) {
    if (fb.success) {
      this.sessionService.markExercixeComplete();
      return;
    }
    for (let err of fb.errors) {
      console.log('err: ', err);
      this.vsService.showNotification(err, 'error');
    }
    console.log('the feedback', fb);
  }

  getFeedback() {
    this.parson.getFeedback();
  }
}
