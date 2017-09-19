import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

class App extends React.Component {
    render() {
        return (
            <div>
                React component
            </div>
        )
    }
}

render(<App />, document.getElementById('root'));