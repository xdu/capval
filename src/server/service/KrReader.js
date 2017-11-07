'use strict'

import fs from 'fs'
import papa from 'papaparse'
import financialModel from '../model/financial'
import mongoose from 'mongoose'

// Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://192.168.99.100/capvar', {
    useMongoClient: true,
})

const reader = (ticker, filename) => {

    papa.parse(fs.createReadStream(filename), {

        complete: (r) => {
            
            // read the dates in the third line
            for (let i = 1; i < r.data[2].length - 1; i ++) {

                let financial = new financialModel()
                financial.ticker = ticker
                financial.year   = r.data[2][i].substring(0,4)
            
                // read each line
                for (let j = 0; j < r.data.length; j ++) {
                    let title = r.data[j][0]
                    let value = r.data[j][i]

                    if (title === "Gross Margin") {
                        financial.ratio.GrossMargin = value

                    } else if (title === 'Operating Margin') {
                        financial.ratio.OperatingMargin = value

                    } else if (title.startsWith("Earnings Per Share")) {
                        financial.ratio.EPS = value

                    } else if (title.startsWith("Payout Ratio")) {
                        financial.ratio.PayoutRatio = value

                    } else if (title === 'Year over Year') {
                        let above = r.data[j-1][0]
                        switch (above) {
                            case 'Revenue %':
                                financial.ratio.RevenueGrowth = value
                                break;
                            case 'Operating Income %':
                                financial.ratio.OperatingIncomeGrowth = value
                                break;
                            case 'Net Income %':
                                financial.ratio.NetIncomeGrowth = value
                                break;
                            case 'EPS %':
                                financial.ratio.EPSGrowth = value
                                break;
                            default:
                                break;
                        }
                    } else if (title === 'Current Ratio') {
                        financial.ratio.CurrentRatio = value

                    } else if (title === 'Quick Ratio') {
                        financial.ratio.QuickRatio = value
                    }
                }

                console.log(financial)
                
                financial.save((err, obj) => {
                        if (! err) {
                            console.log(obj.ticker + " financial saved.")
                        }
                    })
            }
        }        

    })
}

reader('A2A', "./A2A.KR.CSV")