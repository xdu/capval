const stocks = (state = { list: [] }, action) => {

    switch (action.type) {
        case 'GET_STOCKS_FULFILLED':
            return {
                list: action.stocks
            }
        default:
            return state
    }

}

export default stocks