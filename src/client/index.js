import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers'
import App from './app'
import StockContainer from './components/StockContainer'

import 'bootstrap/dist/css/bootstrap.css'

let store = createStore(
    reducers,
    applyMiddleware(thunk, logger)
)

render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
            <Route exact path="/" component={App}></Route>
            <Route path="/stock/:ticker" component={StockContainer}></Route>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);