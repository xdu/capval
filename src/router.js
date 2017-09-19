'use strict'

import express from 'express'
import Stocks from './model/stock'

// Router module
var router = express.Router()

router.route('/stocks')
    .get((req, res) => {
        if (req.query.tick) {
            Stocks.find({ ticker: req.query.tick }, (err, records) => {
                res.json(records)
            })
        } else {
            Stocks.find((err, records) => {
                res.json(records)
            })
        }
    })

router.get('/', (req, res) => {
    res.json({
        message: "router"
    })
})

export default router;