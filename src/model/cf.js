'use strict'

import moogoose from 'mongoose'

var CashFlowSchema = new moogoose.Schema({
    ticker: String,
    date: Date,
    currency: String,
    
    operationActivities: {
        depreciation: Number,
        investments: Number,
        stockBasedCompensation: Number,
        otherWorkingCapital: Number,
        otherNonCashItems: Number,
        subTotal: Number
    },
    investingActivities: {
        propertyInvestments: Number,
        propertyReductions: Number,
        acquisitionsNet: Number,
        intangiblesPurchases: Number,
        intangiblesSales: Number,
        otherInvestingActivities: Number,
        subTotal: Number
        },
    financingActivities: {
        debtIssued: Number,
        debtRepayment: Number,
        commonStockRepurchased: Number,
        dividentPaid: Number,
        otherFinancingActivities: Number,
        subTotal: Number
    },
    exchangeRateEffect: Number,
    cashAtBeginningPeriod: Number,
    cashAtEndPeriod: Number,
    capitalExpenditure: Number, 
    freeCashFlow: Number
})

export default moogoose.model('cf', CashFlowSchema)