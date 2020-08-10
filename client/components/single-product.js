import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/single-product'
import {Link} from 'react-router-dom'
import {fetchCart, addToCart} from '../store/cart'
import { guestAddToCart } from '../store/guest-cart'

class SingleProduct extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
    if(this.props.userId){
      this.props.fetchCart(this.props.userId)
    }
  }

  handleClick(item, event) {
    event.preventDefault()
    console.log('added to cart')
    // this.props.changeCart(this.props.user.id,this.props.cart.id,item.id,0);
    // let result = this.props.cart.products_in_cart.filter((prod) => prod != item)
    // this.props.cart.products_in_cart = result
    // console.log(this.props.cart.products_in_cart)
    if(this.props.userId){
      this.props.addToCart(this.props.userId, this.props.cart.id, item.id)
    }
    else{
      this.props.guestAddToCart(item)
    }
  }

  //   render() {
  //     const {product} = this.props
  //     console.log('prod>>>', product)

  //     return (
  //       <div>
  //         <h4>{product.name}</h4>
  //         <h4>{product.price}</h4>
  //         <h4>Description</h4>
  //         <h4>{product.description}</h4>
  //         <h4>Manufacturer</h4>
  //         <h4>{product.manufacturer}</h4>
  //         <button
  //           type="button"
  //           className="btn btn-secondary"
  //           id="addToCart"
  //           onClick={(event) => this.handleClick(product, event)}
  //         >
  //           Add to cart
  //         </button>
  //         <div>
  //           <h4>Photos</h4>
  //           <div>
  //             {(product.photos || []).map((photo, idx) => (
  //               <div key={idx}>
  //                 <img src={photo} />
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     )
  //   }
  // }

  render() {
    const {product} = this.props

    return (
      <div
        className="product-page"
        style={{
          backgroundImage: "url('../resources/assets/img/all_v2.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className="page-header header-filter"></div>

        <div className="section section-gray">
          <div className="container">
            <div className="main main-raised main-product">
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="tab-content">
                    <div className="tab-pane active" id="product-page2">
                      <img src={product.photos && product.photos[0]} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <h2 className="title"> {product.name} </h2>
                  <h5 className="title"> {product.manufacturer} </h5>
                  <h3 className="main-price">${product.price}</h3>
                  <div id="acordeon">
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-border panel-default">
                        <div
                          className="panel-heading"
                          role="tab"
                          id="headingOne"
                        >
                          <h4 className="panel-title">Description</h4>
                        </div>

                        <div className="panel-body">
                          <p>{product.description}</p>
                        </div>
                      </div>
                      <div className="panel panel-border panel-default"></div>
                    </div>
                  </div>
                  <div className="row text-right">
                    <button
                      type="button"
                      className="btn btn-rose btn-round"
                      onClick={(event) => this.handleClick(product, event)}
                    >
                      Add to Cart
                    </button>
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

const mapStateToProps = (state) => {
  return {
    product: state.product,
    cart: state.cart,
    guestcart: state.guestcart,
    userId: state.user.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    fetchCart: (id) => dispatch(fetchCart(id)),
    addToCart: (userid, cartid, itemid) =>
      dispatch(addToCart(userid, cartid, itemid)),
    guestAddToCart: (product) => dispatch(guestAddToCart(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
