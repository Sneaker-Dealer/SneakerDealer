import React from 'react'

const NotFound = () => {
  return (
    <div
      className="alert alert-secondary"
      style={{paddingTop: '150px', background: 'black'}}
      role="alert"
    >
      <div className="display-1 text-center">404</div>
      <p className="py-5 text-center">
        OOOPPS! THE PAGE YOU WERE LOOKING FOR, COULDN'T BE FOUND.
      </p>
    </div>
  )
}

export default NotFound
