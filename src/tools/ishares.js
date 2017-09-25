'use strict'

import fs from 'fs'
import papa from 'papaparse'
import mongoose from 'mongoose'
import {replace} from 'lodash'
import minimist from 'minimist'
import Stock from '../server/model/stock'

// read the command line arguments
var argv = minimist(process.argv.slice(2))
if (argv._.length == 0) {
    console.log("the file name is mandatory")
    process.exit()
} 

// get the csv file name
const filename = argv._[0]

// connect to the database
mongoose.connect('mongodb://192.168.99.100/capvar', {
    useMongoClient: true,
})

mongoose.connection.on('error', 
    console.error.bind(console, 'connection error:'));

mongoose.connection.once('open', () => {
    // read the csv file
    papa.parse(fs.createReadStream(filename), {
        complete: (r) => {
            for (let i = 1; i < r.data.length; i ++) {

                let t = r.data[i]
                if (t[2] === 'Equity') {

                    Stock.find({ ticker: t[0] }, (err, stocks) => {

                        if (stocks && stocks.length > 0) {
                            console.log('stock ' + t[0] + ' exists already in database.')

                        } else {
                            let e = new Stock()
                            e.ticker        = t[0]
                            e.name          = t[1]
                            e.assetClass    = t[2]
                            e.marketValue   = replace(t[6], ',', '')
                            e.notionalValue = replace(t[7], ',', '')
                            e.sector        = t[8]
                            e.sedol         = t[9]
                            e.isin          = t[10]
                            e.exchange      = t[11]
                            e.country       = t[12]
                            e.currency      = t[14] 

                            // persist to database
                            e.save((err, obj) => {
                                if (err) {
                                    console.error(err)
                                }
                                console.log('Stock ' + t[0] + ' created')                                
                            })
                        }
                    })
                }
            }
        }
    })
})
