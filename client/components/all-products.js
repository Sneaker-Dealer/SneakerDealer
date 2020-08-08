import React, {Component} from 'react'
import {fetchProducts} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  // render() {
  //   const products = this.props.products

  //   return (
  //     <div className="allSneakers row">
  //       {products.map((sneaker) => (
  //         <div
  //           key={sneaker.id}
  //           className="allPageSingleSneaker col-4 col-sm justify-content-center"
  //         >
  //           <Link to={`/products/${sneaker.id}`}>
  //             <img src={sneaker.photos[0]} className=" img-thumbnail" />
  //             <h3>{sneaker.name}</h3>
  //             <div>
  //               Manufacture: {sneaker.manufacturer} <p />
  //               Style: {sneaker.style} <p />
  //               Price: {sneaker.price} <p />
  //               Units in Stock: {sneaker.inventory}
  //             </div>
  //           </Link>
  //         </div>
  //       ))}
  //     </div>
  //   )
  // }

  render() {
    const {products} = this.props

    return (
      <div className="blog-posts">
        <div
          className="page-header header-filter header-small"
          style={{backgroundImage: `url("../resources/assets/img/all_v5.jpg")`}}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center">
                <h2 className="title">One shoe can change your life.</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="main main-raised">
          <div className="container">
            <div className="section">
              <div className="nav nav-bar">
                <div>
                  <h2 className="navbar-header" style={{textAlign: 'center'}}>
                    Currently Available
                  </h2>
                </div>
              </div>
              <div className="row">
                {products.map((product) => {
                  return (
                    <div className="col-md-4" key={product.id}>
                      <div>
                        <div
                          className="card card-raised card-background"
                          style={{backgroundImage: `url(${product.photos[0]})`}}
                        >
                          <div className="card-content">
                            <Link
                              to={
                                '/products/manufacturer/' + product.manufacturer
                              }
                            >
                              <h6 className="category text-info">
                                {product.manufaturer}
                              </h6>
                            </Link>

                            <h3 className="card-title">{product.name}</h3>

                            <p className="card-description">
                              {product.description.length < 50
                                ? product.description
                                : product.description.slice(0, 50) + '...'}
                            </p>
                            <Link
                              className="btn btn-danger btn-round"
                              to={'/products/' + product.id}
                            >
                              View Product
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {getProducts: () => dispatch(fetchProducts())}
}

const mapState = (state) => {
  return {
    products: state.products,
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
