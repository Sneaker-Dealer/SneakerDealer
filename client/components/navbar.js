import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../store'

const Navbar = (props) => {
  const {isLoggedIn, handleClick, isAdmin} = props

  return (
    <nav
      className="navbar navbar-default navbar-transparent navbar-fixed-top navbar-color-on-scroll"
      id="sectionsNav"
    >
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link className="navbar-brand" to="/">
            SNEAKER DEALER
          </Link>
        </div>

        <div className="navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            {isLoggedIn ? (
              <li>
                <a href="#" onClick={handleClick}>
                  <i className="material-icons">apps</i> Logout
                </a>
              </li>
            ) : (
              <li>
                <Link to="/login">
                  <i className="material-icons">account_circle</i> Login
                </Link>
              </li>
            )}

            {isLoggedIn ? (
              isAdmin ? (
                <li className="dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i className="material-icons">view_carousel</i> Admin Panel
                    <b className="caret" />
                  </a>
                  <ul className="dropdown-menu dropdown-with-icons">
                    <li>
                      <Link to="/add-product">
                        <i className="material-icons">account_balance</i> Add
                        Product
                      </Link>
                    </li>
                    <li>
                      <Link to="/edit-product">
                        <i className="material-icons">account_balance</i> Edit
                        Product
                      </Link>
                    </li>
                    <li>
                      <Link to="/users">
                        <i className="material-icons">account_balance</i> View
                        Users
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                // the dead end
                console.log()
              )
            ) : (
              <li>
                <Link to="/signup">
                  <i className="material-icons">assignment</i> Sign Up
                </Link>
              </li>
            )}

            <li>
              <Link to="/">
                <i className="material-icons">apps</i> All Products
              </Link>
            </li>

            <Link to="/cart">
              <button type="button" className="btn btn-white pull-right">
                <i className="material-icons">shopping_cart</i>Cart
              </button>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    isAdmin: !!state.user.isAdmin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
