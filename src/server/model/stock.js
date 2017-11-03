'use strict'

import mongoose from 'mongoose'

/**
 *  MorningstarState:
 *      0, null : not downloaded
 *      1       : successful
 *      -1      : error
 */
var StockSchema = new mongoose.Schema({
    ticker: String,
    name: String,
    assetClass: String,
    marketValue: Number,
    notionalValue: Number,
    sector: String,
    sedol: String,
    isin: String,
    exchange: String,
    country: String,
    currency: String,
    morningstarTicker: String,
    morningstarState: Number 
})

StockSchema.index({ ticker: 1 })

export default mongoose.model('stock', StockSchema, 'stock')
