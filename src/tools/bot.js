'use strict'

import { fetchCSV, fetchRatio } from '../server/service/MorningStarBot'
import Stock from '../server/model/stock'
import mongoose from 'mongoose'

// Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://192.168.99.100/capvar', {
    useMongoClient: true,
})

//Stock.find({ 'ticker': /^[A-Z]/, 'morningstarState': null }).sort({ 'ticker': 1 }).exec((err, records) => {
Stock.find({ 'ticker': 'A3M' }).sort({ 'ticker': 1 }).exec((err, records) => {
    var promise = Promise.resolve();

    let i = 0;
    for(const item of records) {
        console.log(`Download ${item.ticker} = ${item.name}`)

        if (item.morningstarTicker == null) {
            item.morningstarTicker = item.ticker
        }

        promise = promise
            .then(() => fetchAll(item))
            .then(() => item.save((e, obj) => {
                if (e) console.log(e)
            }))
    }

    promise.then(() => {
        console.log("All downloads are ended.")
        mongoose.disconnect()
    })
})

const fetchAll = (stock) => {
        const ticker = stock.morningstarTicker

        return new Promise( (resolve, reject) => { 

            fetchCSV(ticker, 'is')
                .then(() => fetchCSV(ticker, 'cf'))
                .then(() => fetchCSV(ticker, 'bs'))
                .then(() => fetchRatio(ticker))
                .then(() => {
                    stock.morningstarState = 1
                    resolve(ticker)
                })
                .catch((t) => {
                    console.log(`Ticker ${t} download failed.`)

                    stock.morningstarState = -1
                    resolve(ticker)
                })
        })
    
    }