'use strict'

import fs from 'fs'
import readline from 'readline'
import papa from 'papaparse'
import mongoose from 'mongoose'
import BalanceSheetModel from '../model/bs.js'

const filename = "/Users/xdu/Workspace/capval/data/TEMN.bs.csv"

const reader = (ticker, filename) => {

    papa.parse(fs.createReadStream(filename), {

        complete: (r) => {
            // read the dates
            for (let i = 1; i < r.data[1].length; i ++) {
                
                for (let j = 2; j < r.data.length; j ++) {
                    switch (r.data[j][0]) {
                        case 'Total current assets':
                            console.log('current asset ' + r.data[1][i] + ' ' + r.data[j][i])
                            break;
                        case 'Total non-current assets':
                            console.log('non current asset ' + r.data[1][i] + ' ' + r.data[j][i])
                            break;
                        case 'Total current liabilities':
                            console.log('current liabilities ' + r.data[1][i] + ' ' + r.data[j][i])
                            break;
                        case 'Total non-current liabilities':
                            console.log('non current liabilities ' + r.data[1][i] + ' ' + r.data[j][i])
                            break;
                        case 'Total stockholders\' equity':
                            console.log("equity " + r.data[1][i] + ' ' + r.data[j][i])
                            break;
                        default:
                            break;
                    }                
                }
            }
        }        

    })
}

reader('A2A', "./A2A.BS.CSV")