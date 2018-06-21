package nl.remcoder.polyhedral_dice_calculator

import android.app.Application
import com.q42.tolbaaken.AndroidTolbaakenLogger
import com.q42.tolbaaken.Tolbaaken

class PolyhedralApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        if (BuildConfig.DEBUG) {
            Tolbaaken.logger = AndroidTolbaakenLogger
        }
    }
}
