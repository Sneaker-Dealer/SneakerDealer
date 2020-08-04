import React from 'react'

import {Navbar, AllSneakers} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="app container-fluid">
      <Navbar />
      <Routes />
      <AllSneakers />
    </div>
  )
}

export default App
