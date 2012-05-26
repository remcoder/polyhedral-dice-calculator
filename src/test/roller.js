
function DieRollerTests() {
  assertEqual2(3, new Die('1d6')._expectedValueElement('+',3));
  assertEqual2(3.5, new Die('1d6')._expectedValueElement('+', { sides: 6, count: 1} ));
  
  assertEqual2(4.5, new Die('1d6+1').ExpectedValue());
  assertEqual2(5, new Die('2d4').ExpectedValue());
  
  assertEqual2(1, new Die('1d1').Roll());
  assertEqual2(1, new Die('1d1').Roll());
  //debugger;
  assertEqual2(11, new Die('11d1').Roll());
  assertBetween(1, 2, new Die('1d2').Roll());
  assertBetween(1, 6, new Die('1d6').Roll());
  assertBetween(2, 8, new Die('2d4').Roll());
  
  assertBetween(2, 3, new Die('1+1d2').Roll());
  assertBetween(3, 8, new Die('1d6+2').Roll());
  assertBetween(1, 7, new Die('2d4-1').Roll());
  assertBetween(2, 7, new Die('1d3+1d4').Roll());
}

console.log("-- testing polyhedral die roller");
time(function() { runTests(DieRollerTests); });