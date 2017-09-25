import React from 'react'
import { connect } from 'react-redux'
import { onAppLoad } from './actions'
import { Container, Button } from 'reactstrap'

class App extends React.Component {

    componentWillMount() {
        this.props.load()
    }

    render() {
        return (
            <Container>
                <p>Hello, {this.props.message}.</p>
                <Button color="danger">Close</Button>
            </Container>
        )
    }

}

const select = (store) => {
    return {
        message: store.stock.text
    }
}

const actions = (dispatch) => {
    return {
        load : () => dispatch(onAppLoad())
    }
}

export default connect(select, actions)(App);