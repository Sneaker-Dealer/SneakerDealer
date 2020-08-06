import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/single-product'
import {Link} from 'react-router-dom'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
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
          onClick={() => console.log('added to cart.')}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
