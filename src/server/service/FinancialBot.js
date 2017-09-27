'use strict'

import qs from 'querystring'
import fs from 'fs'
import mongoose from 'mongoose'
import 'isomorphic-fetch'

import isParse from './IsReader'

const baseurl = 'http://financials.morningstar.com/ajax/ReportProcess4CSV.html'
const reports = ['is', 'cf', 'bs']

// Database
mongoose.connect('mongodb://192.168.99.100/capvar', {
    useMongoClient: true,
})

function downloadReports(ticker) {

    reports.forEach((rt) => {

        let filename = `${ticker.toUpperCase()}.${rt.toUpperCase()}.CSV`
        console.log(filename);

        if (fs.existsSync(filename)) {
            return
        }

        let query = qs.stringify({
            t: ticker,
            reportType: rt,
            period: 12,
            dataType: 'A',
            order: 'asc',
            columnYear: 10,
            number: 1
        })
        let url = baseurl + '?' + query
        console.log(url)

        setTimeout(() => {
            console.log("Download " + filename)
            fetch(url)
            .then(res => {
                const dest = fs.createWriteStream(filename)
                res.body.pipe(dest)
            })            
        }, Math.random() * 10000)
    
    })
}

function persistReport(ticker, type, filename) {
    switch (type) {
        case 'is':
            isParse(ticker, filename)
            break;
    
        default:
            break;
    }
}

downloadReports('VRGDF')
persistReport('VRGDF', 'is', 'VRGDF.IS.CSV')