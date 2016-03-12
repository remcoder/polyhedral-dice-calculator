var delay = 32;

function intro(onIntroComplete) {
    var text = ['RPG Dice Calculator\nv1.1\n\nby R.Veldkamp'];
    initCalculator({
      font: '/fonts/gohufont/gohufont-11.bdf',
      pixelSize : 2
    }, (lcd) => {

      var glyphs = text.join('\n').split('');
      var index = 0;
      var loop = () => {
        var glyph = glyphs[index];
        lcd.clearCursor();
        lcd.print(glyph);
        lcd.drawCursor();
        index++;
        if (index == glyphs.length) return;

        if (glyph == ' ') {
          loop();
          return;
        }

        setTimeout(loop, delay);
      };

      loop();

    });

    setTimeout( () => {

        $('canvas')[0].getContext('2d').clearRect(0, 0, 600, 300);
        if (typeof onIntroComplete == 'function')
          onIntroComplete();
    }, text.join('\n').length * delay + 2000);
}

this.intro = intro;

