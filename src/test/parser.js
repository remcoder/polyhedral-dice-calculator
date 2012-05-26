
function DieTests() {
    // DIGIT
    assertFullyParsed("DIGIT", "1");
    assertParseMatched("DIGIT", "12", "1");
    assertParseFailed("DIGIT", "b");
        
    // NUMBER
    assertFullyParsed("NUMBER", "1");
    assertFullyParsed("NUMBER", "12");
    assertFullyParsed("NUMBER", "01");
    assertParseFailed("NUMBER", "a");
    assertParseMatched("NUMBER", "1a", "1");
    
    // INTEGER
    assertFullyParsed("INTEGER", "1");
    assertFullyParsed("INTEGER", "10");
    assertParseFailed("INTEGER", "01");
    assertParseFailed("INTEGER", "0");
    assertParseFailed("INTEGER", "a");
    assertParseMatched("INTEGER", "1a", "1");

    // DIE DIE_EXPRESSION
    // 1 die variant
    assertFullyParsed("DIE", "d6");
    assertFullyParsed("DIE", "d7");
    assertFullyParsed("DIE", "d1");
    assertFullyParsed("DIE", "d100");
    
    assertParseMatched("DIE", "d4d", "d4");
    
    assertParseFailed("DIE", "d0.5");
    assertParseFailed("DIE", "d-2");
    assertParseFailed("DIE", "4d");
    assertParseFailed("DIE", "dd4");
    assertParseFailed("DIE", "d");
    assertParseFailed("DIE", "4");
    assertParseFailed("DIE", "1a");
    
    // multiple dice
    assertFullyParsed("DIE", "1d6");
    assertFullyParsed("DIE", "2d7");
    assertFullyParsed("DIE", "3d1");
    assertFullyParsed("DIE", "100d100");
    
    assertParseFailed("DIE", "-1d6");
    assertParseFailed("DIE", "0.5d6");
    
    // expressions
    assertFullyParsed("DIE_EXPR", "1");
    assertFullyParsed("DIE_EXPR", "1+2");
    assertFullyParsed("DIE_EXPR", "1+2+3");
    assertFullyParsed("DIE_EXPR", "1-2");
    
    assertFullyParsed("DIE_EXPR", "d6");
    assertFullyParsed("DIE_EXPR", "d6+1");
    assertFullyParsed("DIE_EXPR", "d6-d4");
    assertFullyParsed("DIE_EXPR", "d4+d6");
    assertFullyParsed("DIE_EXPR", "2d4");
    assertFullyParsed("DIE_EXPR", "2d4+2d6");
    assertFullyParsed("DIE_EXPR", "2d4+2d6-5");
    
    assertLeafEquals("INTEGER", "1", 1);
    assertLeafEquals("INTEGER", "12", 12);
    assertTreeEquals("DIE", "1d6", { count: 1, sides: 6 });
    
    assertTreeEquals("DIE_EXPR", "1d6+2", [{ count: 1, sides: 6 }, "+", 2] );
    assertTreeEquals("DIE_EXPR", "1d6+2d4-3", [{ count: 1, sides: 6 }, "+", { count: 2, sides: 4 }, "-", 3] );
}


console.log("-- testing polyhedral die expression parser");
time(function() { runTests(DieTests); });