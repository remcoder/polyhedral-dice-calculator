package nl.remcoder.polyhedral_dice_calculator

import org.junit.Test

import org.junit.Assert.*

class ParserStepTest {
    @Test
    fun spaceShouldNotBeAllowed() {
        val parser = DieExpressionParser()
        val allowed = parser.next(" ")
        assertEquals(false, allowed)
    }

    @Test
    fun digitShouldBeAllowed() {
        val parser = DieExpressionParser()
        val allowed = parser.next("1")
        assertEquals(true, allowed)
    }

    @Test
    fun multipleDigitShouldBeAllowed() {
        val parser = DieExpressionParser()
        val allowed = parser.next("11")
        assertEquals(true, allowed)
    }

    @Test
    fun digitsAndLettersShouldNotBeAllowed() {
        val parser = DieExpressionParser()
        val allowed = parser.next("1a")
        assertEquals(false, allowed)
    }
}
