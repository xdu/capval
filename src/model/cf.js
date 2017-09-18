'use strict'

import moogoose from 'mongoose'

var CashFlowSchema = new moogoose.Schema({
    ticker: String,
    date: Date,
    currency: String,
    
    operatingActivities: {
        depreciation: Number,
        investments: Number,
        stockBasedCompensation: Number,
        otherWorkingCapital: Number,
        otherNonCashItems: Number,
        total: Number
    },
    investingActivities: {
        propertyInvestments: Number,
        propertyReductions: Number,
        acquisitionsNet: Number,
        intangiblesPurchases: Number,
        intangiblesSales: Number,
        otherInvestingActivities: Number,
        total: Number
    },
    financingActivities: {
        debtIssued: Number,
        debtRepayment: Number,
        commonStockRepurchased: Number,
        dividentPaid: Number,
        otherFinancingActivities: Number,
        total: Number
    },
    exchangeRateEffect: Number,
    cashAtBeginningPeriod: Number,
    cashAtEndPeriod: Number,
    capitalExpenditure: Number, 
    freeCashFlow: Number
})

export default moogoose.model('cf', CashFlowSchema)