'use strict'

import moogoose from 'mongoose'

var BalanceSheetSchema = new moogoose.Schema({

    ticker: String,
    date: Date,
    currency: String,

    totalAssets: Number,
    totalLiabilities: Number,
    totalEquity: Number,
    
    currentAssets: {
        cash: Number,
        shortTermInvestments: Number,
        receivables: Number,
        otherCurrentAssets: Number,
        totalCurrentAssets: Number
    },
    nonCurrentAssets: {
        grossProperty: Number,
        depreciation: Number,
        intangibleAssets: Number,
        deferredIncomeTaxes: Number,
        otherLongTermAssets: Number,
        totalNonCurrentAssets: Number,
        },
    currentLiabilities: {
        shortTermDebt: Number,
        currentCapitalLeases: Number,
        accountsPayable: Number,
        taxesPayable: Number,
        otherCurrentLiabilities: Number,
        totalCurrentLiabilities: Number
    },
    nonCurrentLiabilities: {
        longTermDebt: Number,
        nonCurrentCapitalLeases: Number,
        deferredTaxesLiabilities: Number,
        pension: Number,
        otherLongTermLiabilities: Number,
        totalNonCurrentLiabilities: Number,
    },
    equity: {
        addtionalPaidInCapital: Number,
        retainedEarnings: Number,
        treasuryStock: Number,
        otherComprehensiveIncome: Number,
    }
})

export default moogoose.model('bs', BalanceSheetSchema, 'bs')