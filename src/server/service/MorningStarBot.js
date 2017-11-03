'use strict'

import qs from 'querystring'
import fs from 'fs'
import 'isomorphic-fetch'

const baseurl = 'http://financials.morningstar.com/ajax/ReportProcess4CSV.html'

const fetchCSV = (ticker, type) => {

    // Build the name of the file to write
    let filename = `${ticker.toUpperCase()}.${type.toUpperCase()}.CSV`

    // Check if the file is downloaded already
    if (fs.existsSync(filename)) { 
        return Promise.resolve(ticker)
    }
    console.log(filename);
    
    // Build the URL to call
    let query = qs.unescape(qs.stringify({
        t: ticker,
        reportType: type,
        period: 12,
        dataType: 'A',
        order: 'asc',
        columnYear: 10,
        number: 1
    }))
    let url = baseurl + '?' + query
    console.log(url)

    return new Promise((resolve, reject) => {

        fetch(url).then(res => {

            // Write the file
            const dest = fs.createWriteStream(filename)
            res.body.pipe(dest)

            // Wait a few seconds, then resolve the promise
            res.body.on('end', () => {
                setTimeout(() => { 
                    resolve(ticker) 
                }, Math.random() * 5000)
            })

            res.body.on('error', (err) => {
                fs.unlinkSync(filename)
                reject(ticker)
            })
        })
    })
}

export default fetchCSV;