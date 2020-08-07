import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/single-product'
import {Link} from 'react-router-dom'
import {fetchCart, addToCart} from '../store/cart'

class SingleProduct extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
    this.props.fetchCart(2)
  }

  handleClick(item, event) {
    event.preventDefault()
    console.log('added to cart')
    // this.props.changeCart(this.props.user.id,this.props.cart.id,item.id,0);
    // let result = this.props.cart.products_in_cart.filter((prod) => prod != item)
    // this.props.cart.products_in_cart = result
    // console.log(this.props.cart.products_in_cart)
    this.props.addToCart(2, this.props.cart.id, item.id)
  }

  render() {
    const {product} = this.props
    console.log('prod>>>', product)

    return (
      <div>
        <h4>{product.name}</h4>
        <h4>{product.price}</h4>
        <h4>Description</h4>
        <h4>{product.description}</h4>
        <h4>Manufacturer</h4>
        <h4>{product.manufacturer}</h4>
        <button
          type="button"
          className="btn btn-secondary"
          id="addToCart"
          onClick={(event) => this.handleClick(product, event)}
        >
          Add to cart
        </button>
        <div>
          <h4>Photos</h4>
          <div>
            {(product.photos || []).map((photo, idx) => (
              <div key={idx}>
                <img src={photo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    cart: state.cart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    fetchCart: (id) => dispatch(fetchCart(id)),
    addToCart: (userid, cartid, itemid) =>
      dispatch(addToCart(userid, cartid, itemid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
