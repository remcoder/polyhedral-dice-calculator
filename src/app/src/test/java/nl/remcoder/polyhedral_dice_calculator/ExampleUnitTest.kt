package nl.remcoder.polyhedral_dice_calculator

import org.junit.Test

import org.junit.Assert.*

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
class ExampleUnitTest {
    @Test
    fun emptyStringShouldNotBeAccepted() {
        val parser = DieExpressionParser()
        val result = parser.recognizes("")
        assertEquals(false, result)
    }

    @Test
    fun singleDigitShouldBeAccepted() {
        val parser = DieExpressionParser()
        val result = parser.recognizes("1")
        assertEquals(true, result)
    }

    @Test
    fun doubleDigitShouldBeAccepted() {
        val parser = DieExpressionParser()
        val result = parser.recognizes("12")
        assertEquals(true, result)
    }

    @Test
    fun digitAndDShouldNotBeAccepted() {
        val parser = DieExpressionParser()
        val result = parser.recognizes("1d")
        assertEquals(false, result)
    }

    @Test
    fun numeratorAndDAndDienomenatorShouldBeAccepted() {
        val parser = DieExpressionParser()
        val result = parser.recognizes("2d4")
        assertEquals(true, result)
    }

    @Test
    fun AddOperandStateShouldNotBeAccepted() {
        val parser = DieExpressionParser()
        val result = parser.recognizes("2d4+")
        assertEquals(false, result)
    }

    @Test
    fun DiePlusConstantShouldBeAccepted() {
        val parser = DieExpressionParser()
        val result = parser.recognizes("2d4+2")
        assertEquals(true, result)
    }

    @Test
    fun AddDieStateInSecondOperandShouldNotBeAccepted() {
        val parser = DieExpressionParser()
        val result = parser.recognizes("2d4+2d")
        assertEquals(false, result)
    }

    @Test
    fun TwoDiesShouldBeAccepted() {
        val parser = DieExpressionParser()
        val result = parser.recognizes("2d4+1d6")
        assertEquals(true, result)
    }

    @Test
    fun SubtractionShouldBeAccepted() {
        val parser = DieExpressionParser()
        val result = parser.recognizes("2d4-1d6")
        assertEquals(true, result)
    }

    @Test
    fun ConstantAsFirstOperandShouldBeAccepted() {
        val parser = DieExpressionParser()
        val result = parser.recognizes("1+1d6")
        assertEquals(true, result)
    }
}
