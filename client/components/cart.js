import React from 'react'
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
    const newQuantity = parseInt(event.target.value, 10)
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
    // return (
    //   <div>
    //     <h2>Cart:</h2>
    //     {this.props.cart.products_in_cart ? (
    //       this.props.cart.products_in_cart.map((item) => (
    //         <div key={item.id}>
    //           <Link to={`/products/${item.id}`}>
    //             <img src={item.photos[0]} />
    //             <div>{item.name}</div>
    //           </Link>
    //           <form onSubmit={(event) => this.handleSubmit(item, event)}>
    //             <label htmlFor="quantity">Quantity:</label>
    //             <input
    //               name="quantity"
    //               type="number"
    //               defaultValue={item.Product_Cart.quantity}
    //               onChange={(event) => this.handleChange(item, event)}
    //             />
    //             <button type="submit">Update</button>
    //           </form>
    //           <button
    //             type="button"
    //             className="remove"
    //             onClick={(event) => this.handleClick(item, event)}
    //           >
    //             Remove
    //           </button>
    //           <hr />
    //         </div>
    //       ))
    //     ) : (
    //       <div>Cart is Empty</div>
    //     )}
    //   </div>
    // )
    console.log('cart props>>>', this.props)
    const products = this.props.cart.products_in_cart
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
                            <th className="th-description">Manufacturer</th>
                            <th className="text-right">Price</th>
                            <th className="text-right">Qty</th>
                            <th className="text-right">Amount</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {[] &&
                            products.map((item, index) => (
                              <tr key={item.id}>
                                <td>
                                  <div className="img-container">
                                    <Link to={`/products/${item.product.id}`}>
                                      <img
                                        src={item.product.photos[0]}
                                        alt="..."
                                      />
                                    </Link>
                                  </div>
                                </td>
                                <td className="td-name">
                                  <Link to={`/products/${item.product.id}`}>
                                    {item.product.name}
                                  </Link>
                                  <br />
                                  <small>
                                    from {item.product.manufacturer}
                                  </small>
                                </td>
                                <td>{item.product.style}</td>
                                <td className="td-number">
                                  <small>&#36;</small>
                                  {item.product.price}
                                </td>
                                <td className="td-number">
                                  {item.quantity}
                                  <div className="btn-group">
                                    <button
                                      className="btn btn-round btn-info btn-xs"
                                      onClick={() => props.handleMinus(item)}
                                    >
                                      {' '}
                                      <i className="material-icons">
                                        remove
                                      </i>{' '}
                                    </button>
                                    <button
                                      className="btn btn-round btn-info btn-xs"
                                      onClick={() => props.handlePlus(item)}
                                    >
                                      {' '}
                                      <i className="material-icons">add</i>{' '}
                                    </button>
                                  </div>
                                </td>
                                <td className="td-number">
                                  <small>&#36;</small>
                                  {item.product.price * item.quantity}
                                </td>
                                <td className="td-actions">
                                  <button
                                    type="button"
                                    rel="tooltip"
                                    data-placement="left"
                                    title="Remove item"
                                    className="btn btn-simple"
                                    onClick={() => props.handleDelete(item)}
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
                                .map((el) => el.product.price * el.quantity)
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
