/// <reference path="../typescript/package_defs/all-definitions.d.ts" />
/// <reference path="matrix.ts" />

var COLUMNWIDTH = 7;
var ROWHEIGHT = 11;

class Lcd {
  private cursor : { row:number, column: number };
  private rows : number;
  private columns : number;

  constructor(public matrix : Matrix, public font) {
    this.columns = Math.floor(this.matrix.width / COLUMNWIDTH);
    this.rows = Math.floor(this.matrix.height / ROWHEIGHT);
    console.log('lcd', this.columns, this.rows);
    this.setCursor(0,0);
  }

  public clear() {
    this.matrix.clear();
    this.setCursor(0, 0);
  }

  public setCursor(row, column) {
    if (!this.cursor) this.cursor = { row:0, column:0 };
    this.cursor.row = row;
    this.cursor.column = column;
  }

  public print(value) {
    var s = value + '';
    for (var i=0 ; i<s.length ; i++)
      this._printChar(s[i]);
  }

  public drawCursor() {
    var x = this.cursor.column * COLUMNWIDTH; // hardcoded DWIDTH for now. Pxxl.js 0.4 doesn't support it
    var y = this.cursor.row * ROWHEIGHT;
    this.matrix.fillRect(x,y,6,9);
  }

    public clearCursor() {
        var x = this.cursor.column * COLUMNWIDTH; // hardcoded DWIDTH for now. Pxxl.js 0.4 doesn't support it
        var y = this.cursor.row * ROWHEIGHT;
        this.matrix.clearRect(x,y,6,9);
    }

  public lineFeed() {
    this.cursor.column = 0;
    this.cursor.row++;
  }

  public printText(lines) {


    this._wrap(lines);


    // print
    this.clear();
    for(var l=0 ; l<lines.length ; l++) {
      this.print(lines[l]);

      if (l<lines.length-1 && this.cursor.column > 0)
        this.lineFeed();
      //if (l==lines.length-1 && this.cursor.column > 0)
    }

  }

  private _wrap(lines) {
    // split long lines
    for(var l=lines.length-1 ; l>=0 ; l--) {
      var line = lines[l];
      if (line.length > this.columns) {
        // remove unwrapped line
        lines.splice(l,1);

        // add wrapped lines
        var breaks = Math.ceil(line.length / this.columns);
        for(var w=breaks-1 ; w>=0 ; w--) {
          lines.splice(l, 0, line.substr(this.columns * w, this.columns) )
        }
      }
    }
  }

  private _printChar(c) {
    if  (c == '\n') {
        this.lineFeed();
        return;
    }
    var pixels = this.font.getPixels(c);
    for(var p=0 ; p<pixels.length ; p++) {
      var pixel = pixels[p];
      if (c == 'p' ) pixel.y+=2; // HACK: BBoy is not supported by Pxxl.js 0.4
      if (c == 'y' ) pixel.y+=2; // HACK: BBoy is not supported by Pxxl.js 0.4
      if (c == '-' ) pixel.y-=3; // HACK: BBoy is not supported by Pxxl.js 0.4
      if (c == '=' ) pixel.y-=2; // HACK: BBoy is not supported by Pxxl.js 0.4
      if (c == '+' ) pixel.y-=1; // HACK: BBoy is not supported by Pxxl.js 0.4
      var dx = this.cursor.column * COLUMNWIDTH; // hardcoded DWIDTH for now. Pxxl.js 0.4 doesn't support it
      var dy = this.cursor.row * ROWHEIGHT - 3;
      this.matrix.drawPixel(dx + pixel.x, dy + pixel.y)
    }

    this.cursor.column++;
    if (this.cursor.column == this.columns) {
      this.lineFeed();
    }
  }


}

this.Lcd = Lcd;
