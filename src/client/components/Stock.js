'use strict'

import React from 'react'
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap'

export default class Stock extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        let current = this.props.stock
        console.log(current)

        if (! current) {
            return (<div></div>)
        }

        return (
            <Container>
                <p>{current.ticker}</p>
                <Row>
                    <Col xs="6">Stock Name</Col>
                    <Col xs="6">{current.name}</Col>
                </Row>
                <Row>
                    <Col xs="6">Country</Col>
                    <Col xs="6">{current.country}</Col>
                </Row>
                <Row>
                    <Col xs="6">Sector</Col>
                    <Col xs="6">{current.sector}</Col>
                </Row>
                <Row>
                    <Col xs="6">Market Value</Col>
                    <Col xs="6">{current.marketValue} {current.currency}</Col>
                </Row>
                <Row>
                    <Col xs="6">Morningstar Financials</Col>
                    <Col xs="6">
                        <a target="_blank" href={"http://financials.morningstar.com/income-statement/is.html?t=" + current.ticker}>link</a>
                    </Col>
                </Row>
            </Container>
        )
    }

}

Stock.propTypes = {
    stock: PropTypes.any
}