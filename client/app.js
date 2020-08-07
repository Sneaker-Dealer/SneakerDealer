import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="app container-fluid">
      <Navbar
        fixed
        brand="Material Kit React"
        color="transparent"
        changeColorOnScroll={{
          height: 250,
          color: 'blue',
        }}
      />
      <Routes />
    </div>
  )
}

export default App
