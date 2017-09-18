'use strict'

import express from 'express'
import parser from 'body-parser'
import mongoose from 'mongoose'

import router from './router'

// Base setup
var app = express()

app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())

// Listen port
var port = process.env.PORT || 4000

// Database
mongoose.connect('mongodb://192.168.99.100/capvar', {
    useMongoClient: true,
})

// Register the router
app.use('/api', router)

// Start the server
app.listen(port, () => {
    console.log("Server started on " + port)
})