'use strict'

import { connect } from 'react-redux'
import { getStocks, setCurrent } from '../actions/stock'
import View from './StockList'

const select = (store) => {
    return {
        stocks : store.stocks.list
    }
}

const actions = (dispatch) => {
    return {
        load: (page, size) => dispatch( getStocks(page, size) ),
        setCurrent: (stock) => dispatch( setCurrent(stock) )
    }
}

export default connect(select, actions)(View)