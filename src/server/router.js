'use strict'

import express from 'express'
import { getStocks } from './controller/stocks'

// Router module
var router = express.Router()

router.route('/stocks').get( getStocks )

router.get('/', (req, res) => {
    res.json({
        message: "router"
    })
})

export default router;