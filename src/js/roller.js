function Die(s)
{
  this.ast = DieExprParser(s);
}

Die.prototype = {
  _sum: function (f) {
    var operator, value, acc;
    
    operator = '+';
    value = this.ast[0];
    acc = f(operator, value);
    
    for(var i=1 ; i<this.ast.length ; i+=2)
    {
      operator = this.ast[i];
      value = this.ast[i+1];
      
      acc += f(operator, value);
    }
    
    return acc;
  },
  
  _expectedValueElement: function (operator, value) {
    var type = $.type(value);
    var result;
    
    if ( type === 'number' )
      result = value;
    
    else if ( type === 'object' )
      result = value.count * (value.sides + 1) / 2;
      
    return operator === '+' ? result : -result;
  },
  
  ExpectedValue: function () {
    return this._sum(this._expectedValueElement);
  },
  
  _rolledValueElement: function (operator, value) {
    var type = $.type(value);
    var result;
    
    if ( type === 'number' )
      result = value;
    
    else if ( type === 'object' )
      for (var r=0, result=0 ; r<value.count ; r++)
      {
        result += 1 + Math.floor(Math.random() * value.sides);
      }
      
    return operator === '+' ? result : -result;
  },
  
  Roll: function () {
    return this._sum(this._rolledValueElement);
  }
};