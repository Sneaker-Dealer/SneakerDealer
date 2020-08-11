import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, newCart} from '../store/cart'
import {newGuestCart} from '../store/guest-cart'

class CheckoutPage extends React.Component {
  constructor() {
    super()
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  handleCheckout(event) {
    event.preventDefault()
    if (this.props.userId) {
      this.props.newCart(this.props.userId, this.props.cart.id)
    } else {
      this.props.newGuestCart(this.props.guestcart)
    }
  }

  componentDidMount() {
    console.log(this.props.user.id)
    if (this.props.userId) {
      this.props.fetchCart(this.props.userId)
    }
  }

  render() {
    // const cart = this.props.cart.products_in_cart
    let cart
    if (this.props.userId) {
      cart = this.props.cart.products_in_cart
    } else {
      cart = this.props.guestcart
    }

    console.log(cart)

    return (
      <div
        className="contact-page"
        style={{
          backgroundImage: "url('../resources/assets/img/all_v5.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div id="contactUsMap" className="big-map"></div>

        <div className="main main-raised contact-content">
          <div className="container">
            <h2 className="title">Complete Your Purchase</h2>
            <div className="row">
              <div className="col-md-4">
                {cart.map((element) => (
                  <div
                    key={element.id}
                    className="info info-horizontal icon icon-primary"
                  >
                    <div className="material-icons">
                      <img src={element.photos[0]} alt="..." width="150" />
                    </div>
                    <div className="description">
                      <h4 className="info-title">{element.name}</h4>
                      <p>
                        Manufacturer: {element.manufacturer} <br />
                        Style: {element.style} <br />
                        Quantity: {element.Product_Cart.quantity} <br />
                        Subtotal: $
                        {element.price * element.Product_Cart.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-md-6 col-md-offset-2">
                <p className="description">
                  Please provide us delivery address
                  <br />
                </p>
                <form
                  onSubmit={this.handleCheckout}
                  role="form"
                  id="contact-form"
                  method="post"
                >
                  <div className="form-group label-floating">
                    <label className="control-label">Recipient Name</label>
                    <input
                      type="text"
                      name="recipientName"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group label-floating">
                    <label className="control-label">Confirmation Email</label>
                    <input
                      type="email"
                      name="confirmationEmail"
                      className="form-control"
                    />
                  </div>
                  <br />
                  <div className="form-group label-floating">
                    <label className="control-label">Recipient Address</label>
                    <input
                      type="text"
                      name="recipientAddress"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group label-floating">
                    <label className="control-label">Recipient Phone</label>
                    <input
                      type="text"
                      name="recipientPhone"
                      className="form-control"
                    />
                  </div>
                  <br />
                  <div className="form-group label-floating">
                    <label className="control-label">
                      Special Instructions
                    </label>
                    <textarea
                      name="specialInstructions"
                      className="form-control"
                      id="message"
                      rows="3"
                    ></textarea>
                  </div>
                  <br />
                  <div className="submit text-center">
                    <input
                      type="submit"
                      className="btn btn-primary btn-raised btn-round"
                      value="Submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

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
    newGuestCart: (guestcart) => dispatch(newGuestCart(guestcart)),
    newCart: (userid, cartid) => newCart(userid, cartid),
  }
}

export default connect(mapState, mapDispatch)(CheckoutPage)
