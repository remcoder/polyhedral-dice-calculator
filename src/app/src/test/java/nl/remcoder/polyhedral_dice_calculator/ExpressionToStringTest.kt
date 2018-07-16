package nl.remcoder.polyhedral_dice_calculator

import org.junit.Assert
import org.junit.Test


class ExpressionToStringTest {
    @Test
    fun plusOperator() {
        Assert.assertEquals("+", Operator.plus.toString())
    }

    @Test
    fun minusOperator() {
        Assert.assertEquals("-", Operator.minus.toString())
    }

    @Test
    fun empty() {
        Assert.assertEquals("", Expression.Empty.toString())
    }

    @Test
    fun number() {
        Assert.assertEquals("42", Expression.Number(42).toString())
    }

    @Test
    fun die() {
        Assert.assertEquals("1d4", Expression.Die(
                Expression.Number(1),
                Expression.Number(4)
        ).toString())
    }

    @Test
    fun operator() {
        Assert.assertEquals("1+4", Expression.Operator(
                Expression.Number(1),
                Operator.plus,
                Expression.Number(4)
        ).toString())
    }
}
