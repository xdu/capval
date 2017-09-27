'use strict'

import fs from 'fs'
import papa from 'papaparse'
import IncomeStatementModel from '../model/is'

export default function parse(ticker, filename) {

    console.log("Parse the incoming statement file " + filename)

    papa.parse(fs.createReadStream(filename), {
        complete: (r) => {
            console.log(r.data)

            for (let i = 1; i < r.data[1].length; i ++) {

                console(i)

                /*
                if (! r.data[1][i].match(/\d+)) {
                    continue
                }
                */

                let dt = r.data[1][i] + '-31'

                IncomeStatementModel.find({ticker: ticker, date: dt}, (err, res) => {
                    if (err) {
                        console.error(err)
                        return;
                    }

                    if (res.length == 0) {

                        var is = new IncomeStatementModel()
                        is.ticker = ticker
                        is.currency = 'USD'
                        is.unit = ''
                        is.date = dt
            
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
                })
            }
        }
    })
}

