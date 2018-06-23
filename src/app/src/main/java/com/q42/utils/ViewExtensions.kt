package com.q42.utils

import android.view.ViewGroup
import kotlin.coroutines.experimental.buildSequence

fun ViewGroup.yieldChildren() = buildSequence {
        for (index in 0 until this@yieldChildren.childCount) {
            yield(this@yieldChildren.getChildAt(index))
        }
    }
