'use strict'

import fs from 'fs'
import readline from 'readline'
import papa from 'papaparse'
import mongoose from 'mongoose'
import CashFlowModel from '../model/cf.js'

mongoose.connect('mongodb://192.168.99.100/capvar')
const filename = "/Users/xdu/Workspace/capval/data/TEMN.cf.csv"

papa.parse(fs.createReadStream(filename), {
    complete: (r) => {
        
        for (let i = 1; i < r.data[1].length; i ++) {

            let cf = new CashFlowModel()
            cf.ticker = 'TEMN'
            cf.currency = 'USD'
            cf.date = r.data[1][i] + '-31'

            cf.operatingActivities.depreciation = r.data[3][i]
            cf.operatingActivities.investments = r.data[4][i]
            cf.operatingActivities.stockBasedCompensation = r.data[5][i]
            cf.operatingActivities.otherWorkingCapital = r.data[6][i]
            cf.operatingActivities.otherNonCashItems = r.data[7][i]
            cf.operatingActivities.total = r.data[8][i]

            cf.investingActivities.propertyInvestments = r.data[10][i]
            cf.investingActivities.propertyReductions = r.data[11][i]
            cf.investingActivities.acquisitionsNet = r.data[12][i]
            cf.investingActivities.intangiblesPurchases = r.data[13][i]
            cf.investingActivities.intangiblesSales = r.data[14][i]
            cf.investingActivities.otherInvestingActivities = r.data[15][i]
            cf.investingActivities.total = r.data[16][i]

            cf.financingActivities.debtIssued = r.data[18][i]
            cf.financingActivities.debtRepayment = r.data[19][i]
            cf.financingActivities.commonStockRepurchased = r.data[20][i]
            cf.financingActivities.dividentPaid = r.data[21][i]
            cf.financingActivities.otherFinancingActivities = r.data[22][i]
            cf.financingActivities.total = r.data[23][i]

            cf.exchangeRateEffect = r.data[24][i]
            cf.cashAtBeginningPeriod = r.data[26][i]
            cf.cashAtEndPeriod = r.data[27][i]
            cf.capitalExpenditure = r.data[30][i]
            cf.freeCashFlow = r.data[31][i]

            console.log(cf);
            cf.save((err, obj) => {
                if (err) {
                    console.error(err)
                } else {
                    console.log(obj.ticker + " cash flow saved.")
                }
            })
        }
    }
})