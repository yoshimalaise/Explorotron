import { Component, Input, SimpleChanges } from '@angular/core';
import * as acorn from 'acorn';
import * as generator from 'escodegen';
import * as walk from 'acorn-walk';
import { CommentSlot } from '../../model/comment-slot.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-comment-slot-lens',
  templateUrl: './comment-slot-lens.component.html',
  styleUrls: ['./comment-slot-lens.component.scss']
})
export class CommentSlotLensComponent {

  @Input() code: string;

  elements = [];
  comments = [];
  answers = {};
  

  constructor(private sessionService: SessionService) {}

  ngAfterViewInit(): void {
    this.generateSlots(this.code);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.generateSlots(changes.code.currentValue);
  }

  generateSlots(code: string) {
    this.elements = [];
    this.comments = [];
    this.answers = {};

    const comments = []
    acorn.parse(code, {
      ecmaVersion: 9,
      locations: true,
      onComment: (isBlock, text, start, end, startLoc?, endLoc?) => {
          comments.push({isBlock, text, start});
      },
    });

    this.comments = comments.map((cmnt, i) => ({
      order: i,
      isBlock: cmnt.isBlock,
      text: cmnt.text
    }));

    let sanitisedBody = code;
    this.comments.forEach(cs => {
      sanitisedBody = sanitisedBody.replace(cs.isBlock ? `/*${cs.text}*/` : `//${cs.text}`, '/*REDACTED COMMENT*/');
    });

    sanitisedBody.split('/*REDACTED COMMENT*/').forEach(p => {
      this.elements.push({type: 'code', body: p.trim()});
      this.elements.push({type: 'comment'});
    });
    this.elements.pop();
    this.comments = this.comments.map(c => ({body: c.isBlock ? `/*${c.text}*/` : `//${c.text}`, id: c.order})).sort(a => Math.random() - 0.5);
  }

  handleSelect(event, elementId) {
    const selectedIndex = event;
    const comboBoxId = Math.floor(elementId / 2);
    this.answers[`${comboBoxId}`] = selectedIndex;
    this.checkIfUserWon();
  }

  private checkIfUserWon() {
    if (Object.entries(this.answers).length !== this.comments.length) {
      return false;
    }
    for (const [key, value] of Object.entries(this.answers)) {
      if (`${key}` !== `${value}`) {
        return false;
      }
    }
    
    this.sessionService.markExercixeComplete();
  }
  
}
