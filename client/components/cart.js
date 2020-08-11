import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, changeCart, newCart} from '../store/cart'
import {Link} from 'react-router-dom'
import {guestChangeCart} from '../store/guest-cart'

/**
 * COMPONENT
 */

class Cart extends React.Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
    this.handleMinus = this.handleMinus.bind(this)
    this.handlePlus = this.handlePlus.bind(this)
  }

  handleMinus(item, event) {
    event.preventDefault()
    const newInventory = item.Product_Cart.quantity - 1
    if (!this.props.userId) this.props.guestChangeCart(item, newInventory)
    else {
      if (newInventory <= 0) {
        let result = this.props.cart.products_in_cart.filter(
          (prod) => prod != item
        )
        this.props.cart.products_in_cart = result
        this.props.changeCart(this.props.userId, this.props.cart.id, item.id, 0)
      } else {
        this.props.changeCart(
          this.props.userId,
          this.props.cart.id,
          item.id,
          newInventory
        )
      }
    }
  }

  handlePlus(item, event) {
    event.preventDefault()
    const newInventory = item.Product_Cart.quantity + 1
    if (newInventory <= item.inventory) {
      if (this.props.userId) {
        this.props.changeCart(
          this.props.userId,
          this.props.cart.id,
          item.id,
          newInventory
        )
      } else {
        this.props.guestChangeCart(item, newInventory)
      }
    }
  }

  handleDelete(item, event) {
    event.preventDefault()
    if (this.props.userId) {
      this.props.changeCart(this.props.userId, this.props.cart.id, item.id, 0)
    } else {
      this.props.guestChangeCart(item, 0)
    }
  }

  componentDidMount() {
    if (this.props.userId) {
      this.props.fetchCart(this.props.userId)
    }
  }

  render() {
    let products
    if (this.props.userId) {
      products = this.props.cart.products_in_cart
    } else {
      products = this.props.guestcart
    }

    return (
      <div className="signup-page">
        <div
          className="page-header header-filter"
          style={{
            backgroundImage: `url("../resources/assets/img/all_v3.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-signup">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table className="table table-shopping">
                        <thead>
                          <tr>
                            <th className="text-center"></th>
                            <th>Product</th>
                            <th className="th-description">Style</th>
                            <th className="text-right">Price</th>
                            <th className="text-right">Qty</th>
                            <th className="text-right">Amount</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <div className="img-container">
                                  <Link to={`/products/${item.id}`}>
                                    <img src={item.photos[0]} alt="..." />
                                  </Link>
                                </div>
                              </td>
                              <td className="td-name">
                                <Link to={`/products/${item.id}`}>
                                  {item.name}
                                </Link>
                                <br />
                                <small>from {item.manufacturer}</small>
                              </td>
                              <td>{item.style}</td>
                              <td className="td-number">
                                <small>&#36;</small>
                                {item.price}
                              </td>
                              <td className="td-number">
                                {item.Product_Cart.quantity}
                                <div className="btn-group">
                                  <button
                                    type="button"
                                    className="btn btn-round btn-info btn-xs"
                                    onClick={(event) =>
                                      this.handleMinus(item, event)
                                    }
                                  >
                                    {' '}
                                    <i className="material-icons">
                                      remove
                                    </i>{' '}
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-round btn-info btn-xs"
                                    onClick={(event) =>
                                      this.handlePlus(item, event)
                                    }
                                  >
                                    {' '}
                                    <i className="material-icons">add</i>{' '}
                                  </button>
                                </div>
                              </td>
                              <td className="td-number">
                                <small>&#36;</small>
                                {item.price * item.Product_Cart.quantity}
                              </td>
                              <td className="td-actions">
                                <button
                                  type="button"
                                  rel="tooltip"
                                  data-placement="left"
                                  title="Remove item"
                                  className="btn btn-simple"
                                  onClick={(event) =>
                                    this.handleDelete(item, event)
                                  }
                                >
                                  <i className="material-icons">close</i>
                                </button>
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="2"></td>
                            <td className="td-total">Total</td>
                            <td className="td-price">
                              <small>$</small>
                              {products
                                .map(
                                  (el) => el.price * el.Product_Cart.quantity
                                )
                                .reduce((a, b) => a + b, 0)}
                            </td>
                            <td colSpan="1" className="text-right">
                              <Link to="/checkout">
                                <button
                                  type="button"
                                  className="btn btn-info btn-round"
                                >
                                  Complete Purchase{' '}
                                  <i className="material-icons">
                                    keyboard_arrow_right
                                  </i>
                                </button>
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    guestcart: state.guestcart,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (id) => dispatch(fetchCart(id)),
    changeCart: (userid, cartid, itemid, quantity) =>
      dispatch(changeCart(userid, cartid, itemid, quantity)),
    guestChangeCart: (product, quantity) =>
      dispatch(guestChangeCart(product, quantity)),
    newCart: (id, cartid) => dispatch(newCart(id, cartid)),
  }
}

export default connect(mapState, mapDispatch)(Cart)
