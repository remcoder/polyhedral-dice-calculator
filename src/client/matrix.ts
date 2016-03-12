/// <reference path="../typescript/package_defs/all-definitions.d.ts" />

/*

  matrix display

  idea:
  - the common scenario, drawing characters, is done pixel-by-pixel, so optimize for the drawPixel case
  - drawPixel will take pixelSize and pixelOffset into account and draw immediately to the on-screen canvas (no buffer)
  - an optimized variant might draw multiple pixel at once, using a path.

  - we should also take Retina screens etc into account (devicePixelRatio > 1)


  usage:
  - the matrix takes its dimensions from the available canvas space (clientWidth/clientHeight)

 */



class Matrix {
  public color : string = 'rgba(0,0,0,0.9)';
  public width : number;
  public height : number;
  public devicePixelRatio : number;

  constructor(public ctx: CanvasRenderingContext2D, public pixelSize: number, public pixelOffset: number) {
    this.devicePixelRatio = window.devicePixelRatio || 1;

    // set canvas dimensions
    this.ctx.canvas.width = this.ctx.canvas.clientWidth * this.devicePixelRatio;
    this.ctx.canvas.height = this.ctx.canvas.clientHeight * this.devicePixelRatio;


    this.width = this.ctx.canvas.width / (this.pixelSize + this.pixelOffset) / this.devicePixelRatio;
    this.height = this.ctx.canvas.height / (this.pixelSize + this.pixelOffset) / this.devicePixelRatio;

    console.log('matrix', this.width, this.height);
    this.ctx.fillStyle = this.color;

    this.clear();
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  public drawPixel(x: number, y: number) {
    return this.fillRect(x,y,1,1);
  }

  public fillRect(x: number, y: number, w: number, h:number) {
    this.ctx.fillRect(x * (this.pixelSize+this.pixelOffset) * this.devicePixelRatio,
        y * (this.pixelSize+this.pixelOffset) * this.devicePixelRatio,
        w * this.pixelSize * this.devicePixelRatio,
        h * this.pixelSize * this.devicePixelRatio);
  }

}

this.Matrix = Matrix;
