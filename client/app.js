import React, {Component} from 'react'
import {fetchSneakers} from './store'
import {connect} from 'react-redux'

import {Navbar} from './components'
import Routes from './routes'

class App extends Component {
  componentDidMount() {
    this.props.getSneakers()
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {getSneakers: () => dispatch(fetchSneakers())}
}

const mapState = state => {
  return {
    sneakers: state.sneakers
  }
}

export default connect(mapState, mapDispatch)(App)
