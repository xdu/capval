import React from 'react'
import { connect } from 'react-redux'
import { Container, Button } from 'reactstrap'
import StockListContainer from './components/StockListContainer'

export default class App extends React.Component {

    render() {
        return (
            <Container>
                <Button color="danger">Close</Button>
                <StockListContainer />
            </Container>
        )
    }

}