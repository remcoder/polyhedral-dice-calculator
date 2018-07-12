package nl.remcoder.polyhedral_dice_calculator

import com.q42.tolbaaken.Tolbaaken


data class State(
        val name: String,
        val accepting: Boolean = false,
        var transitions: MutableList<Transition> = mutableListOf()
)

data class Transition(val label: String, val pattern: Regex, val nextState: State)

sealed class Expression {
    object Empty : Expression()
    data class Number(val value: Int) : Expression()
    data class Operator(val left: Expression, val operator: nl.remcoder.polyhedral_dice_calculator.Operator, var right: Expression) : Expression()
    data class Die(val left: Expression, var right: Expression) : Expression()
}

val isDigit = Regex("[0-9]+")
val isOperator = Regex("(\\+|-)")

class DieExpressionParser {
    val initialState = State(name = "Initial")
    var currentState = initialState

    init {
        val addNumerator = State(name = "Add Numerator", accepting = true)
        val createDie = State(name = "Create die")
        val dieNominator = State(name = "Dienominator", accepting = true)
        val addOperand = State(name = "Add Operand")

        initialState.transitions.add(Transition("input digit", isDigit, addNumerator))

        addNumerator.transitions.add(Transition("input d", Regex("d"), createDie))
//        addNumerator.transitions.add(Transition("input digit", isDigit, addNumerator))
        addNumerator.transitions.add(Transition("input operator", isOperator, addOperand))


        createDie.transitions.add(Transition("input dienominator digit", isDigit, dieNominator))

//        dieNominator.transitions.add(Transition("input dienominator digit", isDigit, addNumerator))
        dieNominator.transitions.add(Transition("input operator", isOperator, addOperand))

        addOperand.transitions.add(Transition("input additional numerator digit", isDigit, addNumerator))
    }

    fun next(token: String): Boolean {
        val validTransition = currentState.transitions.find { it.pattern.matches(token) }
        if (validTransition == null) {
//            Tolbaaken.info { "Input '$input' not recognized in state '${currentState.name}'" }
            return false
        }


//        Tolbaaken.info { "Accepted $input, transition: ${validTransition.label}, next state: ${validTransition.nextState} " }

        currentState = validTransition.nextState
//        Tolbaaken.info { "Terminal state? ${currentState.accepting}" }
        return true
    }

    fun recognizes(input: String): Boolean {
        currentState = initialState
        for (token in tokenize(input)) {
            currentState = currentState.transitions.find { it.pattern.matches(token.matchedString) }?.nextState
                    ?: return false
        }
        return currentState.accepting
    }

    // returns null
    fun parse(input: String): Expression? {
        currentState = initialState

        var expression: Expression = Expression.Empty
        var curNode: Expression = expression

        for (token in tokenize(input)) {
            val validTransition = currentState.transitions.find { it.pattern.matches(token.matchedString) }
                    ?: return null

            Tolbaaken.info { "parsing token ${token.matchedString}" }
            when (validTransition.label.toLowerCase()) {
                "input digit" -> expression = Expression.Number(token.matchedString.toInt())
                "input d" -> expression = makeDieExpression(expression)
                "input dienominator digit" -> expression = addDieNominatorToDie(expression, token.matchedString.toInt())
                "input operator" -> {
                    val operator = if (token.matchedString == "+")
                        Operator.plus
                    else
                        Operator.minus
                    expression = makeOperatorExpression(expression, operator)
                }
                "input additional numerator digit" -> {
                    expression = addOperandToOperatorExpression(expression as Expression.Operator, token.matchedString.toInt())
                }
            }
            Tolbaaken.info { "$expression" }

            currentState = validTransition.nextState
        }

        if (!currentState.accepting) {
            return null
        }
        return expression
    }

    fun addNumerator(expression: Expression, number: Int) {

    }

    fun makeDieExpression(prevExpression: Expression): Expression =
            when (prevExpression) {
                Expression.Empty -> TODO()
                is Expression.Number -> Expression.Die(prevExpression, Expression.Empty)
                is Expression.Operator -> {
                    prevExpression.right = makeDieExpression(prevExpression.right)
                    prevExpression
                }
                is Expression.Die -> throw IllegalStateException("Cannot create die expression when current die expression isn't finished")
            }


    fun addDieNominatorToDie(prevExpression: Expression, value: Int): Expression =
            when (prevExpression) {
                Expression.Empty -> throw IllegalStateException("Cannot add die nominator to empty tree. Start a Die expression first")
                is Expression.Number -> throw IllegalStateException("Cannot add number token after number token")
                is Expression.Operator -> {
                    addDieNominatorToDie(prevExpression.right, value)
                    prevExpression
                }
                is Expression.Die -> {
                    prevExpression.right = Expression.Number(value)
                    prevExpression
                }
            }

    fun makeOperatorExpression(prevExpression: Expression, operator: Operator): Expression.Operator {
        return Expression.Operator(prevExpression, operator, Expression.Empty)
    }

    fun addOperandToOperatorExpression(prev: Expression.Operator, value: Int): Expression.Operator {
        prev.right = Expression.Number(value)
        return prev
    }

    data class Token(val name: String, val pattern: Regex)

    val tokens = listOf(
            Token("digit", isDigit),
            Token("operator", isOperator),
            Token("d", Regex("d|D"))
    )

    // TODO: make sealed class
    data class MatchedToken(val token: Token, var matchedString: String)

    fun tokenize(input: String): List<MatchedToken> {
        var curToken: MatchedToken? = null

        val result = mutableListOf<MatchedToken>()
        for (char in input) {
            if (curToken != null && curToken.token.pattern.matches("" + char)) {
                curToken.matchedString += char
            } else {
                val t = tokens.find { it.pattern.matches("" + char) }
                curToken = MatchedToken(t!!, "" + char)
                result.add(curToken)
            }
        }
        return result
    }
}
