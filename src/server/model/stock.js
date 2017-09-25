'use strict'

import mongoose from 'mongoose'

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
    currency: String
})

export default mongoose.model('stock', StockSchema, 'stock')
