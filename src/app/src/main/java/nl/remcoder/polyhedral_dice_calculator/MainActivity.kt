package nl.remcoder.polyhedral_dice_calculator

import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.Observer
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private val expression = MutableLiveData<String>().apply { value = "" }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        button_0.setOnClickListener { expression.value += "0" }
        button_clear.setOnClickListener { expression.value = "" }

        expression.observe(this, Observer{
            input.text = expression.value + "_"
        })
    }
}
