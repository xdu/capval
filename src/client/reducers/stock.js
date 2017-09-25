const stock = (state = { text: 'React' }, action) => {

    switch (action.type) {
        case 'LOAD_STOCKS_FULFILLED':
            return {
                text: 'React reloaded.'
            }
        default:
            return state
    }

}

export default stock