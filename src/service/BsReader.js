'use strict'

import fs from 'fs'
import readline from 'readline'
import papa from 'papaparse'
import mongoose from 'mongoose'
import BalanceSheetModel from '../model/bs.js'

mongoose.connect('mongodb://192.168.99.100/capvar')
const filename = "/Users/xdu/Workspace/capval/data/TEMN.bs.csv"

papa.parse(fs.createReadStream(filename), {
    complete: (r) => {

        for (let i = 1; i < r.data[1].length; i ++) {

            var bs = new BalanceSheetModel()
            bs.ticker = 'TEMN'
            bs.currency = 'USD'
            bs.unit = ''
            bs.date = r.data[1][i] + '-31'

            bs.currentAssets.cash = r.data[5][i]
            bs.currentAssets.shortTermInvestments = r.data[6][i]
            bs.currentAssets.receivables = r.data[8][i]
            bs.currentAssets.otherCurrentAssets = r.data[9][i]
            bs.currentAssets.totalCurrentAssets = r.data[10][i]

            bs.nonCurrentAssets.grossProperty = r.data[13][i]
            bs.nonCurrentAssets.depreciation = r.data[14][i]
            bs.nonCurrentAssets.intangibleAssets = r.data[16][i]
            bs.nonCurrentAssets.deferredIncomeTaxes = r.data[17][i]
            bs.nonCurrentAssets.otherLongTermAssets = r.data[18][i]
            bs.nonCurrentAssets.totalNonCurrentAssets = r.data[19][i]

            bs.currentLiabilities.shortTermDebt = r.data[24][i]
            bs.currentLiabilities.capitalLeases = r.data[25][i]
            bs.currentLiabilities.accountsPayable = r.data[26][i]
            bs.currentLiabilities.taxesPayable = r.data[27][i]
            bs.currentLiabilities.otherCurrentLiabilities = r.data[28][i]
            bs.currentLiabilities.totalCurrentLiabilities = r.data[29][i]

            bs.nonCurrentLiabilities.longTermDebt = r.data[31][i]
            bs.nonCurrentLiabilities.capitalLeases = r.data[32][i]
            bs.nonCurrentLiabilities.deferredTaxesLiabilities =  r.data[33][i]
            bs.nonCurrentLiabilities.pension = r.data[34][i]
            bs.nonCurrentLiabilities.otherLongTermLiabilities = r.data[35][i]
            bs.nonCurrentLiabilities.totalNonCurrentLiabilities = r.data[36][i]

            bs.equity.addtionalPaidInCapital = r.data[39][i]
            bs.equity.retainedEarnings = r.data[40][i]
            bs.equity.treasuryStock = r.data[41][i]
            bs.equity.otherComprehensiveIncome = r.data[42][i]

            bs.totalAssets = r.data[20][i]
            bs.totalLiabilities = r.data[37][i]
            bs.totalEquity = r.data[43][i]

            bs.save((err, obj) => {
                if (err) {
                    console.error(err)
                } else {
                    console.log(obj.ticker + " balance sheets saved.")
                }
            })
        }
    }
})