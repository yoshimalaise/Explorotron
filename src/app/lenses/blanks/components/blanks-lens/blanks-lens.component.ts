import { Component, Input, SimpleChanges } from '@angular/core';
import { BlanksConfig } from '../../model/blanks-config.interface';
import { BlanksGeneratorService } from '../../services/blanks-generator.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BlanksSolutionDialogComponent } from '../blanks-solution-dialog/blanks-solution-dialog.component';

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
    primitives: false,
    operators: false,
    finishedConfig: false
  }

  // see: https://www.npmjs.com/package/ngx-monaco-editor
  editorOptions = {theme: 'vs-dark', language: 'javascript'};


  constructor(private svc: BlanksGeneratorService,  private _snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.blanksConfig.finishedConfig = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.blanksConfig.finishedConfig = false;
  }

  generateBlankCode(){
    this.blankCode =this.svc.generateBlanks(this.code, this.blanksConfig);
    this.blanksConfig.finishedConfig = true;
  }

  handleCodeUpdate(code: string) {
    if (this.svc.compareSnippets(code, this.code)) {
      this._snackBar.open("Congratulations! Code completed successfully!");
    }
  }

  showSolution() {
    this.dialog.open(BlanksSolutionDialogComponent, {
      width: "80%",
      height: "80%"
    });
  }
}
