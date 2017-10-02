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

    clickStock(item) {
        this.props.setCurrent(item);
    }

    render() {
        const rows = this.props.stocks.map((item) => {
            return (
                <tr key={item._id} onClick={() => this.clickStock(item)}>
                    <td>{item.ticker}</td>
                    <td>{item.name}</td>
                    <td>{item.sector}</td>
                    <td>{item.country}</td>
                    <td>{item.marketValue} {item.currency}</td>
                </tr>
            )
        })
        return (
            <Table striped>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Name</th>
                        <th>Sector</th>
                        <th>Country</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        )
    }

}

StockList.propTypes = {
    stocks:     React.PropTypes.array,
    load:       React.PropTypes.func,
    setCurrent: React.PropTypes.func
}

export default StockList