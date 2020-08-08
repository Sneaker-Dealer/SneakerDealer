import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { logout } from '../store'

const Navbar = (props) => {
  const { isLoggedIn, handleClick, userId, isAdmin } = props
  // return (

  //   <nav className="navbar navbar-default navbar-transparent navbar-fixed-top navbar-color-on-scroll"
  //     id="sectionsNav">
  //     <div className="container">
  //       <div className="navbar-header">
  //         <Link to="/">
  //           <h1>SNEAKER DEALER</h1>
  //         </Link>
  //       </div>
  //       <div className="navbar">
  //         {isLoggedIn ? (

  //           <div>
  //             {/* The navbar will show these links after you log in */}
  //             <Link to="/home">Home</Link>
  //             {/* <Link to="/cart">Cart</Link> */}
  //             <Link to={`/cart/${userId}`}>Cart</Link>
  //             <Link to="/">All Products</Link>

  //             {/* If admin, show view users option */}
  //             {isAdmin && <Link to="/users">View Users</Link>}
  //             {isAdmin && <Link to="/add-product">Add Product</Link>}
  //             {isAdmin && <Link to="/edit-product">Edit Product</Link>}
  //             <a href="#" onClick={handleClick}>
  //               Logout
  //           </a>
  //           </div>
  //         ) : (
  //             <div>
  //               {/* The navbar will show these links before you log in */}
  //               <Link to="/login">Login</Link>
  //               <Link to="/signup">Sign Up</Link>
  //               <Link to="/cart">Cart</Link>
  //             </div>
  //           )}
  //       </div>
  //     </div>
  //   </nav>

  // )
  ///

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
          {/* <div className="collapse navbar-collapse"> */}
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
                    <i className="material-icons">view_carousel</i> Accounts
                    <b className="caret" />
                  </a>
                  <ul className="dropdown-menu dropdown-with-icons">
                    <li>
                      <Link to="/admin">
                        <i className="material-icons">account_balance</i> Admin
                        Panel
                      </Link>
                    </li>
                    <li>
                      <Link to="/myaccount">
                        <i className="material-icons">account_circle</i> My
                        Account
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                  <li>
                    <Link to="/myaccount">
                      <i className="material-icons">view_carousel</i> My Account
                  </Link>
                  </li>
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
