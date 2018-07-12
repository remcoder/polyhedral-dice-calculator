package nl.remcoder.polyhedral_dice_calculator

import com.q42.tolbaaken.Tolbaaken
import org.junit.Test

import org.junit.Assert.*
import org.junit.Before

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
class ParserTreeTest {

    @Before
    fun setup() {
        Tolbaaken.logger = TestTolbaakenLogger()
    }

    @Test
    fun emptyStringYieldsNull() {
        val parser = DieExpressionParser()
        val tree = parser.parse("")
        assertEquals(null, tree)
    }

    @Test
    fun digitYieldsLeaf() {
        val parser = DieExpressionParser()
        val tree = parser.parse("1")
        assertEquals(Expression.Number(1), tree)
    }

    @Test
    fun multipleDigitsYieldsSingleLeaf() {
        val parser = DieExpressionParser()
        val tree = parser.parse("64738")
        assertEquals(Expression.Number(64738), tree)
    }

    @Test
    fun dieStringYieldsDieExpressionTree() {
        val parser = DieExpressionParser()
        val tree = parser.parse("1d2")
        assertEquals(Expression.Die(Expression.Number(1), Expression.Number(2)), tree)
    }

    @Test
    fun operatorStringYieldsOperatorExpressionTree() {
        val parser = DieExpressionParser()
        val tree = parser.parse("1+2")
        assertEquals(Expression.Operator(Expression.Number(1), Operator.plus, Expression.Number(2)), tree)
    }

    @Test
    fun diePlusNumberTest() {
        val parser = DieExpressionParser()
        val tree = parser.parse("1d2+3")
        assertEquals(Expression.Operator(
                Expression.Die(
                        Expression.Number(1),
                        Expression.Number(2)),
                Operator.plus,
                Expression.Number(3)),
                tree)
    }

    @Test
    fun numberPlusdieTest() {
        val parser = DieExpressionParser()
        val tree = parser.parse("1+2d3")
        assertEquals(Expression.Operator(
                Expression.Number(1),
                Operator.plus,
                Expression.Die(
                        Expression.Number(2),
                        Expression.Number(3)
                )),
                tree)
    }

    @Test
    fun diePlusdieTest() {
        val parser = DieExpressionParser()
        val tree = parser.parse("1d2+3d4")
        assertEquals(Expression.Operator(
                Expression.Die(
                        Expression.Number(1),
                        Expression.Number(2)
                ),
                Operator.plus,
                Expression.Die(
                        Expression.Number(3),
                        Expression.Number(4)
                )),
                tree)
    }

    @Test
    fun add3numbers() {
        val parser = DieExpressionParser()
        val tree = parser.parse("1+2+3")
        assertEquals(Expression.Operator(
                Expression.Operator(
                        Expression.Number(1),
                        Operator.plus,
                        Expression.Number(2)
                ),
                Operator.plus,
                Expression.Number(3)
        ),
                tree)
    }
}
