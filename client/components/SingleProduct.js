import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {Link} from 'react-router-dom'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
  }

  render() {
    const {product} = this.props
    return (
      <div>
        <h3>Test Info For Single product</h3>
        <h4>{product.name}</h4>
        <h4>{product.price}</h4>
        <h4>Description</h4>
        <h4>{product.description}</h4>
        <h4>Manufacturer</h4>
        <h4>{product.manufacturer}</h4>
        <div>
          <h4>Photos</h4>
          <div>
            {product.photos.map((photo) => (
              <div key={photo}>
                <img src={photo}></img>
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
    fetchSingleStudent: (id) => dispatch(fetchSingleProduct(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
