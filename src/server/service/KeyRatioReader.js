'use strict'

import fs from 'fs'
import readline from 'readline'
import parse from 'csv-parse/lib/sync'
import {set, slice, join} from 'lodash'

const filename = './data/TEMN.keyratio.csv'

const reader = readline.createInterface({
    input: fs.createReadStream(filename)
})

var rv = {}
var years = []
var section = []

reader.on('line', (s) => {

    var line = s.trim()

    if (years.length === 0) {
        // Read the first line of each section to fill the years array.
        let rec = parse(line)
        // The first element of the parse text
        let data = rec[0]
        
        if (data.length <= 1) {
            // New section name
            section = [data[0]]

        } else {
           // Copy the 1th to last element to year array
            years = slice(data, 1)
            // Section name
            if (data[0].trim() !== '') {
                section.push(data[0])
            }
            // Print the read array
            console.log(years)
        }

    } else if (line === '') {
        // We are in a new section, empty the year array
        years = []

    } else {

        let rec = parse(line)
        let data = rec[0]

        if (data.length <= 1) {
            // Section name
            section.push(data[0])
        } else {

            for (let i = 0; i < years.length; i ++) {

                let path = section.slice()
                path.push(data[0]);
                
                let key = join(path, ' -> ')

                set(rv, [years[i], key], data[i+1])
            }
        }

    }

    console.log(rv)
})