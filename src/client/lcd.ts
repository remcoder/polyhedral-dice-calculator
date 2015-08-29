/// <reference path="../typescript/package_defs/all-definitions.d.ts" />
/// <reference path="matrix.ts" />

class Lcd {
  private cursor : { row:number, column: number };
  private rows : number;
  private columns : number;

  constructor(public matrix : Matrix, public font) {
    this.columns = Math.floor(this.matrix.width / 6);
    this.rows = Math.floor(this.matrix.height / 11);
    console.log('lcd', this.columns, this.rows)
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
    var x = this.cursor.column * 6; // hardcoded DWIDTH for now. Pxxl.js 0.4 doesn't support it
    var y = this.cursor.row * 11;
    this.matrix.fillRect(x,y+3,6,8);
  }

  public lineFeed() {
    this.cursor.column = 0;
    this.cursor.row++;
  }

  public setText(lines) {


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

    //// take last lines only
    //var lastLine = lines[lines.length-1];
    //if (lastLine) {
    //  if (lastLine.length == this.columns)
    //    lines = lines.slice(-2);
    //  else
    //    lines = lines.slice(-3);
    //}

    // print
    this.clear();
    for(var l=0 ; l<lines.length ; l++) {
      this.print(lines[l]);

      if (l<lines.length-1 && this.cursor.column > 0)
        this.lineFeed();
    }


    this.drawCursor();
  }


  private _printChar(c) {
    var pixels = this.font.getPixels(c);
    for(var p=0 ; p<pixels.length ; p++) {
      var pixel = pixels[p];
      if (c == '-' ) pixel.y-=3; // HACK: BBoy is not supported by Pxxl.js 0.4
      if (c == '=' ) pixel.y-=2; // HACK: BBoy is not supported by Pxxl.js 0.4
      if (c == '+' ) pixel.y-=1; // HACK: BBoy is not supported by Pxxl.js 0.4
      var dx = this.cursor.column * 6; // hardcoded DWIDTH for now. Pxxl.js 0.4 doesn't support it
      var dy = this.cursor.row * 11;
      this.matrix.drawPixel(dx + pixel.x, dy + pixel.y)
    }

    this.cursor.column++;
    if (this.cursor.column == this.columns) {
      this.lineFeed();
    }
  }


}

this.Lcd = Lcd;
