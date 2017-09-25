import Stock from '../model/stock'

export const getStocks = (req, res) => {

    if (req.query.tick) {
        // Load the specified stock
        Stock.find({ ticker: req.query.tick }, (err, r) => {
            res.json(r[0])
        })

    } else {
        // Load all the stocks
        Stock.find((err, records) => {
            res.json(records)
        })
    }
}