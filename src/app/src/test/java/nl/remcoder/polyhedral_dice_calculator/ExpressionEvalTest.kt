package nl.remcoder.polyhedral_dice_calculator

import org.junit.Assert
import org.junit.Test

class ExpressionEvalTest {

    @Test
    fun rollConstant() {
        Assert.assertEquals(42, Expression.Number(42).eval())
    }

    @Test
    fun roll1Die() {
        val parser = DieExpressionParser()
        val die = parser.parse("1d1")
        Assert.assertEquals("1d1", "$die")
        Assert.assertEquals(1, die?.eval() )
    }

    @Test
    fun rollDie() {
        val parser = DieExpressionParser()
        val die = parser.parse("2d1")
        Assert.assertEquals("2d1", "$die")
        Assert.assertEquals(2, die?.eval() )
    }

    @Test
    fun roll2Dice() {
        val parser = DieExpressionParser()
        val die = parser.parse("1d1+1d1")
        Assert.assertEquals("1d1+1d1", "$die")
        Assert.assertEquals(2, die?.eval() )
    }

    @Test
    fun rolld2() {
        val parser = DieExpressionParser()
        val die = parser.parse("1d2")!!
        Assert.assertEquals("1d2", "$die")
        repeat(10) { Assert.assertTrue(die.eval() in 1..2) }
    }
}
