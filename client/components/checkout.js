import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart, changeCart} from '../store/cart'

class CheckoutPage extends React.Component {
  componentDidMount() {
    console.log(this.props.user.id)
    // this.props.fetchCart(this.props.user.id)
    this.props.fetchCart(2)
  }

  render() {
    const cart = this.props.cart

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
                {([] || cart).map((element) => (
                  <div
                    key={element.id}
                    className="info info-horizontal icon icon-primary"
                  >
                    <div className="material-icons">
                      <img
                        src={element.product.photos[0]}
                        alt="..."
                        width="150"
                      />
                    </div>
                    <div className="description">
                      <h4 className="info-title">{element.product.name}</h4>
                      <p>
                        Manufacturer: {element.product.breeder} <br />
                        Style: {element.product.breed} <br />
                        Quantity: {element.quantity} <br />
                        Subtotal: ${element.product.price * element.quantity}
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
                  onSubmit={(e) => handleSubmit(e, props.user.id, props.cart)}
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
  }
}

export default connect(mapState, mapDispatch)(CheckoutPage)
