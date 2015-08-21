Session.setDefault('input', '');

function roll() {
  var input = Session.get('input');

  if (input.indexOf('d') == -1) {
    try {
      var result = eval(input);
    } catch(e)  { result = '';}
    Session.set('output', result);
    return;
  }

  var d = new Die(input.replace(/ /g, ''));
  for(var i=0 ; i<6 ; i++)
    (function () {
      delayedOutput(randomDie(), i*80);
    }(i));

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


Template.calculator.helpers({
  input : function() {
    return Session.get('input') + '_';
  },
  output : function() {
    return Session.get('output');
  }
});

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

  intro();

});


