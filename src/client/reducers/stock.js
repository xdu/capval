const initial = {
    list : [],
    current : null
}

const stocks = (state = initial, action) => {

    switch (action.type) {
        case 'GET_STOCKS_FULFILLED':
            return {
                list: action.stocks,
                current : null
            }
        case 'SET_CURRENT_FULFILLED' :
            return {
                ... state,
                current : action.current
            }
        default:
            return state
    }

}

export default stocks