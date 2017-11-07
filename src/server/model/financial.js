'use strict'

import mongoose from 'mongoose'

var FinancialSchema = new mongoose.Schema({

    ticker: String,
    year: Number,
    currency: String,

    bs : {
        currentAssets: Number,
        nonCurrentAssets: Number,
        currentLiabilities: Number,
        nonCurrentLiabilities: Number,
        equity: Number
    },

    // Ratio
    ratio : {
        GrossMargin: Number,
        OpertingMargin: Number,
        EPS: Number,
        PayoutRatio: Number,
        RevenueGrowth: Number,
        OperatingIncomeGrowth: Number,
        NetIncomeGrowth: Number,
        EPSGrowth: Number,
        CurrentRatio: Number,
        QuickRatio: Number
    }

})

FinancialSchema.index({ ticker: 1 })

export default mongoose.model('financial', FinancialSchema, 'financial')