'use strict'

import mongoose from 'mongoose'

var HoldingSchema = new mongoose.Schema({
    ticker: {
        type: String
    },
    name: {
        type: String
    },
    assetClass: {
        type: [{
            type: String,
            enum: ['Equity']
        }]
    },
    marketValue: {
        type: Number
    },
    notionalValue: {
        type: Number
    },
    sector: {
        type: String
    },
    sedol: {
        type: String
    },
    isin: {
        type: String
    },
    exchange: {
        type: String,
    },
    country: {
        type: String
    },
    currency: {
        type: String
    }
})

export default mongoose.model('holdings', HoldingSchema)
