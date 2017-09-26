'use strict'

import React from 'react'
import { Table } from 'reactstrap'

class StockList extends React.Component {

    constructor(props) {
        super(props)
        this.state = { page: 1, size: 10 }
    }

    componentWillMount() {
        this.props.load(this.state.page, this.state.size)
    }

    render() {
        const rows = this.props.stocks.map((item) => {
            return (
                <tr key={item._id}>
                    <td>{item.ticker}</td>
                    <td>{item.isin}</td>
                    <td>{item.name}</td>
                </tr>
            )
        })
        return (
            <Table striped>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>ISIN</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        )
    }

}

StockList.propTypes = {
    stocks: React.PropTypes.array,
    load: React.PropTypes.func
}

export default StockList