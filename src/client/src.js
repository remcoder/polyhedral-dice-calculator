Session.setDefault('input', '');

var displayReady = new ReactiveVar(false);
var lcd;

function roll() {
  var input = Session.get('input');

  if (input.indexOf('d') == -1) {
    try {
      var result = eval(input);
    } catch(e)  { result = '';}
    Session.set('output', result);
    return;
  }

  try {
    var d = new Die(input.replace(/ /g, ''));
  }
  catch (e) {
    Session.set('output', 'ERROR');
    return;
  }

  delayedOutput(d.Roll(), 6 * 80);
}

var dice = '⚀⚁⚂⚃⚄⚅';
function randomDie() {
  return dice[Math.floor(Math.random() * 6)];
}

function delayedOutput(value, delay) {
  Meteor.setTimeout(function() {
    Session.set('output', value );
  }, delay);
}

Template.calculator.events({
  'click .button-panel button' : function(evt) {
    var el = evt.currentTarget;
    var action = el.getAttribute('data-action');

    if (action && action == 'roll')
      return roll();


    // take first letter.
    var button = el.innerText.trim()[0].toLocaleLowerCase();

    if ("d0123456789+-".indexOf(button) > -1)
      Session.set('input', Session.get('input') + button );
    else if (button == 'c') {
      Session.set('input', '');
      Session.set('output', '');
    }
  }
});


Meteor.startup(function() {
  console.log('startup');
  $('.calculator-wrapper').css({opacity:1});
  if (Meteor.isCordova)
    navigator.splashscreen.hide();

  //intro();
  var ctx = $('canvas')[0].getContext('2d');
  var matrix = new Matrix(ctx, 3, 0);

  Pxxl.LoadFont('/fonts/gohufont/gohufont-11.bdf', function(font) {
    console.log('font loaded');
    lcd = new Lcd(matrix, font);

    displayReady.set(true);
  });
});


Tracker.autorun(function() {
  if (!displayReady.get()) return;

  //console.log('printing');
  lcd.clear();
  lcd.print(Session.get('input'));
  var output = Session.get('output') + '';
  if (output) {
    lcd.setCursor(2, 0);
    lcd.print(output);
  }
  lcd.drawCursor();
});
