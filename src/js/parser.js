var MINUS = ch("-");
var PLUS = ch("+");
var OPERATOR = choice(PLUS, MINUS);

var DIGIT = range("0","9");
var NUMBER = repeat1(DIGIT);

var MakeInteger = function(p)  { return action(p, 
  function(s) { 
    if (!s[1])
      return parseInt(s[0],10); 

    return parseInt(s[0] + s[1].join(''), 10);
  }); 
};
var INTEGER = MakeInteger(sequence(butnot(DIGIT, "0"), optional(NUMBER)));


var MakeDie = function(p) { 
  return action(p, function(ast) { 
    var dieCount = ast[0] === false ? 1 : ast[0];
    //console.log("die ast: ", ast);
    return { sides : ast[2], count: dieCount };  
  });
};
var DIE = MakeDie(sequence(optional(INTEGER), "d", INTEGER));


// Forward definitions required due to lack of laziness in JS 
var DIE_EXPR = function(state) { return DIE_EXPR(state); }

function MakeExpr(p)
{
  return action(p, function(ast) {
    var result = [ ast[0] ];
    var tail = ast[1];
    for (var i=0 ; i<tail.length ; i++)
    {
      result.push( tail[i][0] );
      result.push( tail[i][1] );
    }
    return result;
  });
}
var VALUE = choice(butnot(INTEGER, DIE), DIE, DIE_EXPR); //choice(DIE, INTEGER);
var DIE_EXPR = MakeExpr(sequence(VALUE, repeat0(sequence(OPERATOR, VALUE))));

var DieExprParser = function(s) { 
  
  return DIE_EXPR(ps(s)).ast; };
