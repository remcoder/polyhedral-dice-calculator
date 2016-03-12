Session.setDefault('input', '');
Session.setDefault('output', '');

var lcd;
var displayReady = new ReactiveVar(false);

function roll() {
  var input = Session.get('input');

  if (input.indexOf('d') == -1) {
    try {
      var result = eval(input);
    } catch(e)  { result = '';}
    Session.set('output', result + '');
    return;
  }

  try {
    var d = new Die(input.replace(/ /g, ''));
  }
  catch (e) {
    Session.set('output', 'ERROR');
    return;
  }

  Session.set('rolling', true);
  Session.set('output', null);
  delayedOutput(d.Roll(), 6 * 80);
}

function delayedOutput(value, delay) {
  Meteor.setTimeout(function() {
    Session.set('rolling', false);
    Session.set('output', value.toString() );
  }, delay);
}

Template.calculator.events({
  'click .button-panel button' : function(evt) {
    if (Session.get('rolling')) return;

    var el = evt.currentTarget;
    var action = el.getAttribute('data-action');

    if (action && action == 'roll' && Session.get('input') && Session.get('input').length )
      return roll();


    // take first letter.
    var button = el.innerText.trim()[0].toLocaleLowerCase();

    pressButton(button);
  }
});


Meteor.startup(function() {
  console.log('initializing');
  $('.calculator-wrapper').css({opacity:1});
  if (Meteor.isCordova)
    navigator.splashscreen.hide();

  //intro(() => initCalculator({
  //  font: '/fonts/gohufont/gohufont-11.bdf',
  //  pixelSize : 3
  //}, () => displayReady.set(true)) );

  initCalculator({
    font: '/fonts/gohufont/gohufont-11.bdf',
    pixelSize : 3
  }, () => displayReady.set(true));

  $(document).on('keydown', function(evt) {
    if (Session.get('rolling')) return;

    var button = String.fromCharCode(evt.which);
    //console.log(button);

    // HACK
    if (button == '»') button = '+';
    if (button == '½') button = '-';

    pressButton(button.toLowerCase());
  });
});

initCalculator = function (options, callback) {
  var ctx = $('canvas')[0].getContext('2d');
  var matrix = new Matrix(ctx, options.pixelSize, options.pixelOffset || 0);

  Pxxl.LoadFont(options.font, function(font) {
    console.log('font loaded');
    lcd = new Lcd(matrix, font);
    if (typeof callback == 'function')
      callback(lcd);
  });
};


function pressButton(button) {
  var maxInputLength = (lcd.rows - 1) * lcd.columns - 1;

  var input = Session.get('input');
  if ("d0123456789+-".indexOf(button) > -1 && input.length < maxInputLength)
    Session.set('input', input + button );
  else if (button == 'c') {
    Session.set('input', '');
    Session.set('output', '');
  }
}

Tracker.autorun(function() {
  if (!displayReady.get()) return;

  var input = Session.get('input');
  if (typeof input == 'string')
    lcd.printText([input]); //.replace(/\+/g, ' + ').replace(/-/g, ' - '));


  if (!Session.get('rolling'))
    lcd.drawCursor();
  lcd.lineFeed();

  var output = Session.get('output');
  if (output) {
    if (typeof output == 'number')
      output = output.toString();

    if (typeof output == 'string') {
      lcd.lineFeed();
      lcd.print(['>>> ' + output]);
    }
  }

});

