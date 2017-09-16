'use strict'

import moogoose from 'mongoose'

var IncomeStatementSchema = new moogoose.Schema({
    ticker: String,
    date: Date,
    currency: String,
    
    revenue: Number,
    costOfRevenue: Number,
    grossProfit: Number,
    operatingExpenses: {
        salesAndAdministratives: Number,
        otherOperatingExpenses: Number,
        totalOperatingExpenses: Number,
    },
    operatingIncome: Number,
    otherIncome: Number,
    incomeBeforeTaxes: Number,
    provisionForIncomeTaxes: Number,
    continuingOperationsNetIncome: Number,
    netIncome: Number,
    netIncomeShareholders: Number,
    earningsPerShare: {
        basic: Number,
        diluted: Number,
    },
    weightedAverage: {
        basic: Number,
        diluted: Number,
    },
    EBITDA: Number
})

export default moogoose.model('is', IncomeStatementSchema)