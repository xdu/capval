'use strict'

import qs from 'querystring'
import fs from 'fs'
import 'isomorphic-fetch'

const baseurl = 'http://financials.morningstar.com/ajax/ReportProcess4CSV.html?'
const query = qs.stringify({
    t: 'VRGDF',
    reportType: 'is',
    period: 12,
    dataType: 'A',
    order: 'asc',
    columnYear: 10,
    number: 1
})
const url = baseurl + query

console.log(url)

fetch(url)
    .then(res => {
        const dest = fs.createWriteStream('./VRGDF.IS.20170927171500.CSV')
        res.body.pipe(dest)
    })
