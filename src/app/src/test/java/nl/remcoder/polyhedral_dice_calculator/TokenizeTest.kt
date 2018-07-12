package nl.remcoder.polyhedral_dice_calculator

import org.junit.Test

import org.junit.Assert.*


class TokenizeTest {
    @Test
    fun emptyStringShouldYieldEmptyList() {
        val parser = DieExpressionParser()
        val result = parser.tokenize("")
        assert(result.isEmpty())
    }

    @Test
    fun OneDigitShouldYieldOneDigitToken() {
        val parser = DieExpressionParser()
        val result = parser.tokenize("1")
        assert(result.size == 1)
    }

    @Test
    fun TwoDigitsShouldYieldOneDigitToken() {
        val parser = DieExpressionParser()
        val result = parser.tokenize("11")
        assert(result.size == 1)
    }

    @Test
    fun TwoDigitsSeparatedByAnOperatorShouldYieldThreeTokens() {
        val parser = DieExpressionParser()
        val result = parser.tokenize("1+1")
        assert(result.size == 3)
        assertEquals(result[0].matchedString, "1")
        assertEquals(result[1].matchedString, "+")
        assertEquals(result[2].matchedString, "1")
    }

    @Test
    fun MiscTokenTest1() {
        val parser = DieExpressionParser()
        val result = parser.tokenize("12+1")
        assert(result.size == 3)
        assertEquals(result[0].matchedString, "12")
        assertEquals(result[1].matchedString, "+")
        assertEquals(result[2].matchedString, "1")
    }

    @Test
    fun MiscTokenTest2() {
        val parser = DieExpressionParser()
        val result = parser.tokenize("12+12")
        assert(result.size == 3)
        assertEquals(result[0].matchedString, "12")
        assertEquals(result[1].matchedString, "+")
        assertEquals(result[2].matchedString, "12")
    }

    @Test
    fun MiscTokenTest3() {
        val parser = DieExpressionParser()
        val result = parser.tokenize("2d6")
        assert(result.size == 3)
        assertEquals(result[0].matchedString, "2")
        assertEquals(result[1].matchedString, "d")
        assertEquals(result[2].matchedString, "6")
    }

    @Test
    fun MiscTokenTest4() {
        val parser = DieExpressionParser()
        val result = parser.tokenize("12d20")
        assert(result.size == 3)
        assertEquals(result[0].matchedString, "12")
        assertEquals(result[1].matchedString, "d")
        assertEquals(result[2].matchedString, "20")
    }

    @Test
    fun MiscTokenTest5() {
        val parser = DieExpressionParser()
        val result = parser.tokenize("d4+2d6")
        assert(result.size == 6)
        assertEquals(result[0].matchedString, "d")
        assertEquals(result[1].matchedString, "4")
        assertEquals(result[2].matchedString, "+")
        assertEquals(result[3].matchedString, "2")
        assertEquals(result[4].matchedString, "d")
        assertEquals(result[5].matchedString, "6")
    }

    @Test
    fun MiscTokenTest6() {
        val parser = DieExpressionParser()
        val result = parser.tokenize("12d12-2d6+3")
        assert(result.size == 9)
        assertEquals(result[0].matchedString, "12")
        assertEquals(result[1].matchedString, "d")
        assertEquals(result[2].matchedString, "12")
        assertEquals(result[3].matchedString, "-")
        assertEquals(result[4].matchedString, "2")
        assertEquals(result[5].matchedString, "d")
        assertEquals(result[6].matchedString, "6")
        assertEquals(result[7].matchedString, "+")
        assertEquals(result[8].matchedString, "3")
    }
}
