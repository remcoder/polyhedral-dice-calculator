var passed = [];
var failed = [];

function assertTrue(msg, test) {
    if(test)
  passed.push(msg);
    else
  failed.push(msg);
}

function assertTrue2(test) {
    if(eval(test))
  passed.push(test);
    else
  failed.push(test);
}

function assertFalse(msg, test) {
    if(test)
  failed.push(msg);
    else
  passed.push(msg);
}

function assertEqual(msg, value1, value2) {
  
  if(value1 === value2) 
    passed.push(msg);
  else
    failed.push(msg);
}

function assertEqual2(expected, actual) {
  
  var msg = "expected " + expected + ", but got " + actual;
    
  if(expected === actual) 
    passed.push(msg);
  else
    failed.push(msg);
}

function assertBetween(min, max, actual) {
  var msg = "expected between " + min + " and " + max + ", but got " + actual;
  
  if (min <= actual && actual <= max)
    passed.push(msg);
  else
    failed.push(msg);
}

function assertNotEqual(msg, value1, value2) {
    if(value1 != value2) 
  passed.push(msg);
    else
  failed.push(msg);
}

function assertFullyParsed(parser, string) {
  var msg = parser + " did not fully parse: " + string;
  try {
    var result = eval(parser)(ps(string));
    if(result && result.remaining.length == 0) 
        passed.push(msg);
    else
        failed.push(msg);
  }
  catch(e) {
    failed.push(msg);
  }
}

function assertParseFailed(parser, string) {
    var msg = parser + " succeeded but should have failed: " + string;
    try {
  var result = eval(parser)(ps(string));
  if(!result) 
      passed.push(msg);
  else
      failed.push(msg);
    }
    catch(e) {
  failed.push(msg);
    }
}

function assertParseMatched(parser, string, expected) {
    var msg = parser + " parse did not match: " + string;
    try {
  var result = eval(parser)(ps(string));
  if(result && result.matched == expected) 
      passed.push(msg);
  else
      failed.push(msg + " got [" + result.matched + "] expected [" + expected + "]");
    }
    catch(e) {
  failed.push(msg);
    }
}

function time(func) {
    var start = new Date; //java.lang.System.currentTimeMillis();
    var r =  func();
    var end = new Date; //java.lang.System.currentTimeMillis();
    console.log("Time: " + (end-start) + "ms");
    return r;
}

function runTests(func) {
    passed = [];
    failed = [];
    func();
    var total = passed.length + failed.length;
    for(var i=0; i < failed.length; ++i) 
      console.error(failed[i]);
    console.log(total + " tests: " + passed.length + " passed, " + failed.length + " failed");
}

function assertLeafEquals (p, input, expected) {
  var result = eval(p)(ps(input)).ast;
  assertEqual(p + " not flat: expected " + expected + " but got: " + result, result , expected )
}

function assertTreeEquals (p, input, expected) {
  var result = eval(p)(ps(input)).ast;
  var msg = "parse result from " + p + "('" + input + "') was: " + JSON.stringify(result) + " expected: " + JSON.stringify(expected);

  if( _.isEqual(result, expected) ) 
    passed.push(msg);
  else  
    failed.push(msg);
}
