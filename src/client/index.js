import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers'
import App from './app'

import 'bootstrap/dist/css/bootstrap.css'

let store = createStore(
    reducers,
    applyMiddleware(thunk, logger)
)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);