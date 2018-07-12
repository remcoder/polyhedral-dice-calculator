package nl.remcoder.polyhedral_dice_calculator

import com.q42.tolbaaken.TolbaakenLogLevel
import com.q42.tolbaaken.TolbaakenLogger

class TestTolbaakenLogger : TolbaakenLogger {

    override fun log(level: TolbaakenLogLevel, tag: String, message: String, throwable: Throwable?) {
        System.out.println("[$level][$tag] $message")
        throwable?.let {
            System.out.println("$throwable")
        }
    }
}
