package nl.remcoder.polyhedral_dice_calculator

import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.Observer
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.widget.Button
import android.widget.TextView
import com.q42.utils.yieldChildren
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private val calc = RPGDiceCalculator()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        calc.expression.observe(this, Observer{
            input.text = it + "_"
        })

        calc.isValidExpression.observe(this, Observer { isValid ->
            if (isValid == true)
                (input as TextView).setTextColor(resources.getColor(R.color.black))
            if (isValid == false)
                (input as TextView).setTextColor(resources.getColor(R.color.red))
        })

        calc.lastRoll.observe(this, Observer { it?.let { result.text = "> $it" } })

        buttons.yieldChildren()
            .filterIsInstance<Button>()
            .forEach {
                it.setOnClickListener {
                    when(it.id) {
                        R.id.button_0 -> calc.onPressButton(NumberButton(0))
                        R.id.button_1 -> calc.onPressButton(NumberButton(1))
                        R.id.button_2 -> calc.onPressButton(NumberButton(2))
                        R.id.button_3 -> calc.onPressButton(NumberButton(3))
                        R.id.button_4 -> calc.onPressButton(NumberButton(4))
                        R.id.button_5 -> calc.onPressButton(NumberButton(5))
                        R.id.button_6 -> calc.onPressButton(NumberButton(6))
                        R.id.button_7 -> calc.onPressButton(NumberButton(7))
                        R.id.button_8 -> calc.onPressButton(NumberButton(8))
                        R.id.button_9 -> calc.onPressButton(NumberButton(9))

                        R.id.button_d -> calc.onPressButton(DieButton())

                        R.id.button_plus -> calc.onPressButton(OperatorButton(Operator.plus))
                        R.id.button_minus -> calc.onPressButton(OperatorButton(Operator.minus))

                        R.id.button_clear -> calc.onPressButton(CommandButton(Command.clear))
                        R.id.button_roll -> calc.onPressButton(CommandButton(Command.roll))
                    }
                }
            }
    }
}
