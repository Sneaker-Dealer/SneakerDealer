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
    this.props.fetchCart(10)
  }

  render() {
    // console.log("cart props in cart",this.props.cart.products_in_cart)
    return (
      <div>
        <h2>Cart:</h2>
        {this.props.cart.products_in_cart ? (
          this.props.cart.products_in_cart.map((item) => (
            <div key={item.id}>
              <Link to={`/products/${item.id}`}>
                <img src={item.photos[0]} />
                <div>{item.name}</div>
              </Link>
              <h4>Quantity: {item.Product_Cart.quantity}</h4>
            </div>
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
