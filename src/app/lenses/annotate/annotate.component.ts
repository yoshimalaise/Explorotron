import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.scss']
})
export class AnnotateComponent implements AfterViewInit {
  selectedColor: 'white' | 'red' | 'blue' | 'orange' | 'purple' | 'eraser' = 'white';
  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;

  // based on https://dev.to/javascriptacademy/create-a-drawing-app-using-javascript-and-canvas-2an1
  // based on https://daily-dev-tips.com/posts/javascript-mouse-drawing-on-the-canvas/
  tracking = false;
  oldX = 0;
  oldY = 0;
  eraserWidth = 20;
  eraserHeight = 20;

  constructor (public state: StateService) {

  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');

    setTimeout(() => this.resizeCanvas(), 500);

    this.canvas.nativeElement.onmousedown = (event) => {
      this.oldX = event.offsetX;
      this.oldY = event.offsetY;
      this.tracking = true;
    };

    const mouseUpHandler = (event) => {
      this.tracking = false;
    }
    this.canvas.nativeElement.onmouseup = mouseUpHandler;

    this.canvas.nativeElement.onmousemove = (event) => {
      if (this.tracking && this.selectedColor !== 'eraser') {
        this.drawMouse(event);
      } else if (this.tracking) {
        this.eraseMouse(event);
      }
    };

    // TODO figure out why it works on ipad after switching orientation but not before...
    document.onresize = (event) => {
      this.resizeCanvas();
    }
  }

  private drawMouse(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    const ctx = this.context;

    ctx.lineWidth = 2;
    ctx.strokeStyle = this.selectedColor;
    ctx.beginPath();
    ctx.moveTo(this.oldX, this.oldY);
    ctx.lineTo(x, y);
    ctx.stroke();
    this.oldX = x;
    this.oldY = y;
  }

  private eraseMouse(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    this.context.clearRect(x - this.eraserWidth / 2, y - this.eraserHeight / 2, this.eraserWidth, this.eraserHeight);
  }

  private resizeCanvas() {
    const c: HTMLElement = document.getElementById("canvas") as HTMLElement;
    if (!c) {
      return;
    }

    // here we will try to overlay the canvas on the zone that actually has code
    const brct = c.getBoundingClientRect();
    this.context.canvas.width = brct.width;
    this.context.canvas.height = brct.height;
  }

}
