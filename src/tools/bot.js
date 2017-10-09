'use strict'

import qs from 'querystring'
import fs from 'fs'
import 'isomorphic-fetch'

const baseurl = 'http://financials.morningstar.com/ajax/ReportProcess4CSV.html?'

export default function fetchTickerFiles(ticker) { 

    const reports = ['is', 'bs', 'cf']

    for (var r in reports) {
        let delay = Math.random() * 10000
        console.log("Fetch " + reports[r] + ' report in ' + delay + " ms")

        setTimeout(_getSingleFile.bind(this, ticker, reports[r]), delay)
    }

}

var _getSingleFile = function(ticker, type) {

    const query = qs.stringify({
        t: ticker,
        reportType: type,
        period: 12,
        dataType: 'A',
        order: 'asc',
        columnYear: 10,
        number: 1
    })
    let url = baseurl + query
    console.log(url)

    fetch(url)
        .then(res => {
            const dest = fs.createWriteStream('./data/' + ticker.toUpperCase() + '.' + type.toUpperCase() + '.CSV')
            res.body.pipe(dest)
        })
}

fetchTickerFiles('TEMN')