'use strict'

import fs from 'fs'
import readline from 'readline'
import parse from 'csv-parse'
import mongoose from 'mongoose'
import Holding from './model/holding'
import {replace} from 'lodash'

mongoose.connect('mongodb://192.168.99.100/capvar')

const filename = './data/IEUS_holdings.csv'

const reader = readline.createInterface({
    input: fs.createReadStream(filename)
})

let i = 1

reader
.on('line', (s) => {
    let input = s.trim()
    if (input) {
        parse(input, {}, (err, output) => {
            let t = output[0]
            if (t[2] === 'Equity') {
                let e = new Holding()
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
                e.save((err, obj) => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log("save " + obj.ticker)
                    }
                })
            }
        })
    }
})
.on('close', () => {
    Holding.find({}, (err, entity) => {
        console.log(entity)
    })
})