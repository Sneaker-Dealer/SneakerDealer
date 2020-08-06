import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart(this.props.user.id)
  }

  render() {
    return (
      <div>
        <h1>Cart:</h1>
        {this.props.user.id ? (
          this.props.cart.product.map((item) => (
            <Link to={`/products/${item.id}`} key={item.id}>
              <img src={item.photos[0]}></img>
              <div>{item.name}</div>
            </Link>
          ))
        ) : (
          <div>Cart is Empty</div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    cart: state.cart,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (id) => dispatch(fetchCart(id)),
  }
}

export default connect(mapState, mapDispatch)(Cart)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//     email: PropTypes.string
// }
