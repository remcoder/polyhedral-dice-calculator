package nl.remcoder.polyhedral_dice_calculator

import android.arch.lifecycle.LiveData
import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.Transformations
import com.q42.tolbaaken.Tolbaaken
import com.q42.tolbaaken.TolbaakenLogger

enum class Operator {
    plus,
    minus;

    override fun toString() : String = when (this) {
        Operator.plus -> "+"
        Operator.minus -> "-"
    }
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

class RPGDiceCalculator {
    private val parser = DieExpressionParser()
    private val _expression = MutableLiveData<String>().apply { value = ""  }
    val expression = _expression as LiveData<String>
    private val _lastRoll = MutableLiveData<String>().apply { value = "" }
    val lastRoll = _lastRoll as LiveData<String>

    val isValidExpression = Transformations.map(expression) { parser.recognizes(it) }
    val parsedExpression = Transformations.map(expression, parser::parse)

    fun onPressButton(button: Button) {
        when(button) {
            is CommandButton -> when (button.command) {
                Command.clear -> clear()
                Command.roll -> roll()?.let { _lastRoll.value = "$it" }
            }
            is OperatorButton -> when (button.operator) {
                Operator.plus -> tryInput('+')
                Operator.minus -> tryInput('-')
            }

            is NumberButton -> {
                assert(button.number in 0..9) { "Number should be in [1,9]" }
                tryInput(button.number.toString()[0])
            }

            is DieButton -> tryInput('d')
        }
    }

    fun tryInput(char: Char) {
        if (parser.recognizes(_expression.value + char, true))
            _expression.value += char
    }

    fun clear() {
        _expression.value = ""
        _lastRoll.value = ""
    }

    fun roll() : Int? {

        Tolbaaken.info { "Rolling!" }
        val input = expression.value ?: return null
        return parser.parse(input)?.eval()
    }
}
