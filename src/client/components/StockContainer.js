'use strict'

import { connect } from 'react-redux'
import View from './Stock'

const select = (store) => {
    return {
        stock : store.stocks.current
    }
}

export default connect(select)(View)