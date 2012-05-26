
function PolyDieCalc($root, $keyEventRoot)
{
  this.$root = $root.eq(0); // even when mupliple elements match the query, we take only the first one
  this.$keyEventRoot = $keyEventRoot || document;
  
  
  this.$input = $root.find('.screen.input');
  this.$output = $root.find('.screen.output');
  
  this.inputBuffer = ""; // holding the current expression
  this.outputBuffer = ""; // holding the most recent result of a dice roll
  
  this.clear();
}

PolyDieCalc.prototype = {
  
  inputhandler: function(keycode) {
    var input;
    
    console.log(keycode);
    //forge.logging.info("innerWidth: " + innerWidth)
    //console.log(evt.which);

    switch (keycode)
    {
      case 27: // ESC
        this.clear();
        break;
      
      case 8: // backspace?
        this.inputBuffer = this.inputBuffer.substr(0,this.inputBuffer.length-1);
        this.update();
        break;
      
      case 114: // r  
      case 61: // =
      case 13: // ENTER
        if ( this.inputBuffer.length )
        {
          this.roll();
        }
        break;
        
      default:
        input = String.fromCharCode(keycode).toLowerCase();
        //console.log(input);
        if ("d0123456789+-".indexOf(input) > -1)
          this.inputBuffer += input;
        else if (input == 'c')
          this.clear();
    }
    
    this.update();
  },
  
  clear: function() {
    this.inputBuffer = '';
    this.outputBuffer = '';
    this.update();
  },
  
  update: function() {
    this.$input.text( this.inputBuffer + "_");
    this.$output.text( this.outputBuffer + " " + String.fromCharCode(171));
  },
  
  roll: function(index) {
    index = index || 0;
    var dice = ['\u2680','\u2681','\u2682','\u2683','\u2684','\u2685',]
    var icon = dice[Math.floor(Math.random() * 6)];
    //console.log(icon);

    this.$input.text( this.inputBuffer + icon);
    
    if (index > 5)
    {
      this.$input.text( this.inputBuffer + '_');
      var d = new Die(this.inputBuffer.replace(/ /g, ''));
      this.outputBuffer = d.Roll();
      this.update();
    }
    else    
      setTimeout($.proxy(function() {
        this.roll(index+1);
      },this), 80);
  }
};
