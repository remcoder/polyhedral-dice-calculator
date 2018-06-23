package nl.remcoder.polyhedral_dice_calculator

import android.arch.lifecycle.LiveData
import android.arch.lifecycle.MutableLiveData

enum class Operator {
    plus,
    minus
}

enum class Command {
    clear,
    roll
}

sealed class Button
class DieButton : Button()
data class NumberButton(val number: Int) : Button()
data class OperatorButton(val operator: Operator) : Button()
data class CommandButton(val command: Command) : Button()

const val allowedChars = "01234567890d"

class RPGDiceCalculator {
    private val _expression = MutableLiveData<String>().apply { value = ""  }
    val expression = _expression as LiveData<String>


    fun onPressButton(button: Button) {
        when(button) {
            is CommandButton -> when (button.command) {
                Command.clear -> clear()
                Command.roll -> roll()
            }
            is OperatorButton -> when (button.operator) {
                Operator.plus -> _expression.value += "+"
                Operator.minus -> _expression.value += "-"
            }

            is NumberButton -> {
                assert(button.number in 0..9, { "Number should be in [1,9]" })
                _expression.value += button.number.toString()
            }

            is DieButton -> _expression.value += "d"
        }
    }

    fun clear() {
        _expression.value = ""
    }

    fun roll() {

    }
}
