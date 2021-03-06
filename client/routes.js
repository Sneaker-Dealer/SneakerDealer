import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Login,
  Signup,
  UserHome,
  AllUsers,
  AddProduct,
  EditProduct,
  AllProducts,
  SingleProduct,
  CheckoutPage,
  NotFound,
} from './components'
import Cart from './components/cart'

import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <div className="routes">
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route exact path="/" component={AllProducts} />
          <Route exact path="/products/:id" component={SingleProduct} />
          {/*Remove before deploy for testing route when no user logged in */}
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              {/* Only admins can view all users! */}
              {isAdmin && <Route path="/users" component={AllUsers} />}
              {isAdmin && <Route path="/add-product" component={AddProduct} />}
              {isAdmin && (
                <Route path="/edit-product" component={EditProduct} />
              )}
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,

    //check if the user is an admin
    isAdmin: !!state.user.isAdmin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
