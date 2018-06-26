package nl.remcoder.polyhedral_dice_calculator

import com.q42.tolbaaken.Tolbaaken


data class State(
    val name: String,
    val accepting : Boolean = false,
    var transitions : MutableList<Transition> = mutableListOf()
)

data class Transition(val label : String, val pattern : Regex, val nextState : State)

class DieExpressionParser {
    val initialState = State(name = "Initial")
    var currentState = initialState

    init {
        val addNumerator = State(name = "Add Numerator", accepting = true)
        val createDie = State(name = "Create die")
        val dieNominator = State(name = "Dienominator", accepting = true)
        val addOperand = State(name = "Add Operand")
        val isDigit = Regex("[0-9]")
        val isOperator = Regex("(\\+|-)")

        initialState.transitions.add(Transition("input digit", isDigit , addNumerator))

        addNumerator.transitions.add(Transition("input 'd'", Regex("d"), createDie ))
        addNumerator.transitions.add(Transition("input digit", isDigit, addNumerator))
        addNumerator.transitions.add(Transition("input operator", isOperator, addOperand))


        createDie.transitions.add(Transition("input dienominator digit", isDigit, dieNominator))

        dieNominator.transitions.add(Transition("input dienominator digit", isDigit, addNumerator))
        dieNominator.transitions.add(Transition("input oparator" , isOperator , addOperand))

        addOperand.transitions.add(Transition("input numerator digit", isDigit, addNumerator))

    }

    fun next(input : Char) : Boolean {
        val validTransition = currentState.transitions.find { t -> t.pattern.matches("" + input) }
        if (validTransition == null) {
//            Tolbaaken.info { "Input '$input' not recognized in state '${currentState.name}'" }
            return false
        }

//        Tolbaaken.info { "Accepted $input, transition: ${validTransition.label}, next state: ${validTransition.nextState} " }

        currentState = validTransition.nextState
//        Tolbaaken.info { "Terminal state? ${currentState.accepting}" }
        return true
    }

    fun isAccepted() = currentState.accepting

    fun recognizes(input : String) : Boolean {
        currentState = initialState
        for (char in input) {
            if (!next(char))
                return false
        }
        return isAccepted()
    }

}
