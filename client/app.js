import React from 'react'

import {Navbar, AllProducts} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="app container-fluid">
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
