import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {convertCodeToSvg, createSVGRender, convertCodeToFlowTree } from 'js2flowchart';
import { defaultTheme } from './js-flowchart.theme';

@Component({
  selector: 'app-js-flowchart',
  templateUrl: './js-flowchart.component.html',
  styleUrls: ['./js-flowchart.component.scss'],
})
export class JsFlowchartComponent implements AfterViewInit {
  @Input() snippet: string;
  @ViewChild('chart') chartContainer;

  constructor() { }

  ngAfterViewInit(): void {
      this.updateChart(this.snippet);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.snippet.currentValue) {
      this.updateChart(changes.snippet.currentValue);
    }
  }

  updateChart(code: string) {
    const flowTree = convertCodeToFlowTree(code);
    const svgRender = createSVGRender();
    svgRender.applyTheme(defaultTheme);
    const svg = svgRender.buildShapesTree(flowTree).print();
    if (this.chartContainer?.nativeElement) {
      this.chartContainer.nativeElement.innerHTML = svg;
    }
  }

}
