/// <reference path="../typescript/package_defs/all-definitions.d.ts" />
/// <reference path="matrix.ts" />

class Lcd {
  private cursor : { row:number, column: number };
  private rows : number;
  private columns : number;

  constructor(public matrix : Matrix, public font) {
    this.columns = this.matrix.width / 8;
    this.rows = this.matrix.height / 8;
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

  private _printChar(c) {
    var pixels = this.font.getPixels(c);
    for(var p=0 ; p<pixels.length ; p++) {
      var pixel = pixels[p];
      if (c == '-') pixel.y-=2; // HACK: BBoy is not supported by Pxxl.js 0.4
      var dx = this.cursor.column * 6; // hardcoded DWIDTH for now. Pxxl.js 0.4 doesn't support it
      var dy = this.cursor.row * 11;
      this.matrix.drawPixel(dx + pixel.x, dy + pixel.y)
    }

    this.cursor.column++;
  }


}

this.Lcd = Lcd;
