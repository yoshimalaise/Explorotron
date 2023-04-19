import { AfterViewInit, Component } from '@angular/core';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements AfterViewInit {
  deck: any;

  constructor(public state: StateService) {
    
  }

  ngAfterViewInit(): void {
    if (!this.deck) {
      this.deck = new Reveal({plugins: [
        Markdown,
        Highlight,
      ],
      controls: true,
      controlsTutorial: false,
      progress: true,
      slideNumber: false,
      touch: false
    });
    }
    
    this.deck.initialize(document.querySelector( '.slides' ), {
      embedded: true,
      markdown: {
        smartypants: true
      }
    });

  }
}
