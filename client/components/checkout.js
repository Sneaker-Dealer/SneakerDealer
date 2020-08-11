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
    let customerinfo = {recipientName: this.recipientName.value,confirmationEmail: this.confirmationEmail.value,
      recipientAddress: this.recipientAddress.value, recipientPhone: this.recipientPhone.value, 
      specialInstructions: this.specialInstructions.value
    }
    if(this.props.userId){
      this.props.newCart(this.props.userId,this.props.cart.id,customerinfo)
    }
    else{
      this.props.newGuestCart(this.props.guestcart,customerinfo)
    }
    
  }

  componentDidMount() {
    if (this.props.userId) {
      this.props.fetchCart(this.props.userId)
    }
  }

  render() {
    let cart
    if (this.props.userId) {
      cart = this.props.cart.products_in_cart;
    }
    else {
      cart = this.props.guestcart;
    }

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
                      <img
                        src={element.photos[0]}
                        alt="..."
                        width="150"
                      />
                    </div>
                    <div className="description">
                      <h4 className="info-title">{element.name}</h4>
                      <p>
                        Manufacturer: {element.manufacturer} <br />
                        Style: {element.style} <br />
                        Quantity: {element.Product_Cart.quantity} <br />
                        Subtotal: ${element.price * element.Product_Cart.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-md-6 col-md-offset-2">
                <p className="description">
                  Please provide us a delivery address
                  <br />
                </p>
                <form
                  onSubmit={this.handleCheckout}
                  role="form"
                  id="contact-form"
                  method="post"
                >
                  <div className="form-group label-floating">
                    <label className="control-label">Name</label>
                    <input
                      type="text"
                      name="recipientName"
                      className="form-control"
                      ref = {name => this.recipientName = name}
                      required
                    />
                  </div>

                  <div className="form-group label-floating">
                    <label className="control-label">Email</label>
                    <input
                      type="email"
                      name="confirmationEmail"
                      className="form-control"
                      ref = {email => this.confirmationEmail = email}
                      required
                    />
                  </div>
                  <br />
                  <div className="form-group label-floating">
                    <label className="control-label">Address</label>
                    <input
                      type="text"
                      name="recipientAddress"
                      className="form-control"
                      ref = {address => this.recipientAddress = address}
                      required
                    />
                  </div>
                  <div className="form-group label-floating">
                    <label className="control-label">Phone Number</label>
                    <input
                      type="tel"
                      pattern="[0-9]{10}" 
                      maxLength="12"  
                      title="Ten Digit Phone Number. Number Only. No Spaces. No Dashes."
                      name="recipientPhone"
                      className="form-control"
                      ref = {phone => this.recipientPhone = phone}
                      required
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
                      ref = {special => this.specialInstructions = special}
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
    newGuestCart: (guestcart,customerinfo) => dispatch(newGuestCart(guestcart,customerinfo)),
    newCart: (userid,cartid,customerinfo) => dispatch(newCart(userid,cartid,customerinfo))
  }
}

export default connect(mapState, mapDispatch)(CheckoutPage)
