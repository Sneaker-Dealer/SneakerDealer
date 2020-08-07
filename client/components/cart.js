import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchCart, changeCart} from '../store/cart'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */

class Cart extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(item, event) {
    event.preventDefault()
    const newQuantity = parseInt(event.target.value)
    item.inventory = newQuantity
  }

  handleSubmit(item, event) {
    event.preventDefault()
    const newInventory = item.inventory
    // this.props.changeCart(this.props.user.id,this.props.cart.id,item.id,newInventory);
    this.props.changeCart(2, this.props.cart.id, item.id, newInventory)
    console.log('Quantity updated')
  }

  handleClick(item, event) {
    event.preventDefault()
    console.log('Quantity changed')
    // this.props.changeCart(this.props.user.id,this.props.cart.id,item.id,0);
    let result = this.props.cart.products_in_cart.filter((prod) => prod != item)
    this.props.cart.products_in_cart = result
    console.log(this.props.cart.products_in_cart)
    this.props.changeCart(2, this.props.cart.id, item.id, 0)
  }

  componentDidMount() {
    console.log(this.props.user.id)
    // this.props.fetchCart(this.props.user.id)
    this.props.fetchCart(2)
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
              {/* <h4>Quantity: {item.Product_Cart.quantity}</h4> */}
              <form onSubmit={(event) => this.handleSubmit(item, event)}>
                <label htmlFor="quantity">Quantity:</label>
                <input
                  name={item.id}
                  type="number"
                  defaultValue={item.Product_Cart.quantity}
                  onChange={(event) => this.handleChange(item, event)}
                />
                <button type="submit">Update</button>
              </form>
              <button
                type="button"
                className="remove"
                onClick={(event) => this.handleClick(item, event)}
              >
                Remove
              </button>
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
    userId: state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (id) => dispatch(fetchCart(id)),
    changeCart: (userid, cartid, itemid, quantity) =>
      dispatch(changeCart(userid, cartid, itemid, quantity)),
  }
}

export default connect(mapState, mapDispatch)(Cart)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//     email: PropTypes.string
// }
