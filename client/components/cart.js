import React from 'react'
import { connect } from 'react-redux'
import { fetchCart, changeCart } from '../store/cart'
import { Link } from 'react-router-dom'
import { guestChangeCart } from '../store/guest-cart'

/**
 * COMPONENT
 */

class Cart extends React.Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
    // this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMinus = this.handleMinus.bind(this)
    this.handlePlus = this.handlePlus.bind(this)
  }

  handleMinus(item, event) {
    event.preventDefault()
    const newInventory = item.Product_Cart.quantity - 1
    if (!this.props.userId) this.props.guestChangeCart(item, newInventory)
    else {
      console.log('Minus')
      if (newInventory <= 0) {
        let result = this.props.cart.products_in_cart.filter((prod) => prod != item)
        this.props.cart.products_in_cart = result
        this.props.changeCart(this.props.userId, this.props.cart.id, item.id, 0)
      }
      else {
        this.props.changeCart(this.props.userId, this.props.cart.id, item.id, newInventory)
      }
    }
  }

  // this.props.changeCart(this.props.user.id,this.props.cart.id,item.id,newInventory);

handlePlus(item, event) {
  event.preventDefault()
  // this.props.changeCart(this.props.user.id,this.props.cart.id,item.id,newInventory);
  const newInventory = item.Product_Cart.quantity + 1
  if (newInventory <= item.inventory) {
    if (this.props.userId) {
      this.props.changeCart(this.props.userId, this.props.cart.id, item.id, newInventory)
    }
    else {
      this.props.guestChangeCart(item, newInventory)
    }
  }
}


  // handleChange(item, event) {
  //   event.preventDefault()
  //   const newQuantity = parseInt(event.target.value, 10)
  //   item.inventory = newQuantity
  // }

  // handleSubmit(item, event) {
  //   event.preventDefault()
  //   const newInventory = item.inventory
  //   // this.props.changeCart(this.props.user.id,this.props.cart.id,item.id,newInventory);
  //   this.props.changeCart(2, this.props.cart.id, item.id, newInventory)
  //   console.log('Quantity updated')
  // }

  handleDelete(item, event) {
    event.preventDefault()
    console.log('Quantity changed')
    // this.props.changeCart(this.props.user.id,this.props.cart.id,item.id,0);
    if (this.props.userId) {
      // let result = this.props.cart.products_in_cart.filter((prod) => prod != item)
      // this.props.cart.products_in_cart = result
      this.props.changeCart(this.props.userId, this.props.cart.id, item.id, 0)
    }
    else {
      this.props.guestChangeCart(item, 0)
    }

    console.log(this.props.cart.products_in_cart)
  }

  componentDidMount() {
    console.log(this.props.user.id)
    if (this.props.userId) {
      this.props.fetchCart(this.props.userId)
    }
    // this.props.fetchCart(2)

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

    //=========
    console.log('cart props>>>', this.props)  // why props are empty? why it is not fetching....
    //=========
    ///
    //
    let products
    if (this.props.userId) {
      products = this.props.cart.products_in_cart;
    }
    else {
      products = this.props.guestcart;
    }

    return (
      <div className='signup-page'>
        <div className="page-header header-filter" style={{ backgroundImage: `url("../resources/assets/img/all_v3.jpg")`, backgroundSize: "cover", backgroundPosition: "top center" }}>
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
                            <th >Product</th>
                            <th className="th-description">Style</th>
                            <th className="text-right">Price</th>
                            <th className="text-right">Qty</th>
                            <th className="text-right">Amount</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {[] && products.map((item) => (
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
                                <br /><small>from {item.manufacturer}</small>
                              </td>
                              <td>
                                {item.style}
                              </td>
                              <td className="td-number">
                                <small>&#36;</small>{item.price}
                              </td>
                              <td className="td-number">
                                {item.Product_Cart.quantity}
                                <div className="btn-group">
                                  <button type="button" className="btn btn-round btn-info btn-xs" onClick={(event) => this.handleMinus(item, event)}> <i className="material-icons">remove</i> </button>
                                  <button type="button" className="btn btn-round btn-info btn-xs" onClick={(event) => this.handlePlus(item, event)}> <i className="material-icons">add</i> </button>
                                </div>
                              </td>
                              <td className="td-number">
                                <small>&#36;</small>{item.price * item.Product_Cart.quantity}
                              </td>
                              <td className="td-actions">
                                <button type="button" rel="tooltip" data-placement="left" title="Remove item" className="btn btn-simple" onClick={(event) => this.handleDelete(item, event)}>
                                  <i className="material-icons">close</i>
                                </button>
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="2">
                            </td>
                            <td className="td-total">
                              Total
                                          </td>
                            <td className="td-price">
                              <small>$</small>{products.map(el => el.price * el.Product_Cart.quantity).reduce((a, b) => a + b, 0)}
                            </td>
                            <td colSpan="1" className="text-right">
                              <Link to='/checkout'>
                                <button type="button" className="btn btn-info btn-round">
                                  Complete Purchase <i className="material-icons">keyboard_arrow_right</i>
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
    guestcart: state.guestcart
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (id) => dispatch(fetchCart(id)),
    changeCart: (userid, cartid, itemid, quantity) =>
      dispatch(changeCart(userid, cartid, itemid, quantity)),
    guestChangeCart: (product, quantity) => dispatch(guestChangeCart(product, quantity))
  }
}

export default connect(mapState, mapDispatch)(Cart)
