'use strict'

export function getStocks(page, size) {
    return (dispatch) => {
        fetch('/api/stocks')
            .then((response) => response.json())
            .then((data) => {
                dispatch({
                    type: 'GET_STOCKS_FULFILLED',
                    stocks: [...data]
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
} 
