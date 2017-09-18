'use strict'

import fs from 'fs'
import readline from 'readline'
import papa from 'papaparse'
import mongoose from 'mongoose'
import IncomeStatementModel from '../model/is'

mongoose.connect('mongodb://192.168.99.100/capvar')
const filename = "/Users/xdu/Workspace/capval/data/TEMN.is.csv"

papa.parse(fs.createReadStream(filename), {
    complete: (r) => {

        for (let i = 1; i < r.data[1].length; i ++) {

            var is = new IncomeStatementModel()
            is.ticker = 'TEMN'
            is.currency = 'USD'
            is.unit = ''
            is.date = r.data[1][i] + '-31'

            is.revenue = r.data[2][i]
            is.costOfRevenue = r.data[3][i]
            is.grossProfit = r.data[4][i]
            is.operatingExpenses.salesAndAdministratives = r.data[6][i]
            is.operatingExpenses.otherOperatingExpenses = r.data[7][i]
            is.operatingExpenses.totalOperatingExpenses = r.data[8][i]

            is.operatingIncome = r.data[9][i]
            is.otherIncome = r.data[10][i]
            is.incomeBeforeTaxes = r.data[11][i]
            is.provisionForIncomeTaxes = r.data[12][i]
            is.continuingOperationsNetIncome = r.data[13][i]
            is.netIncome = r.data[14][i]
            is.netIncomeShareholders = r.data[15][i]

            is.earningsPerShare.basic = r.data[17][i]
            is.earningsPerShare.diluted = r.data[18][i]
            is.weightedAverage.basic = r.data[20][i]
            is.weightedAverage.diluted = r.data[21][i]
            is.EBITDA = r.data[22][i]

            is.save((err, obj) => {
                if (err) {
                    console.error(err)
                } else {
                    console.log(obj.ticker + " income statement saved.")
                }
            })
        }
    }
})