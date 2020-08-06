import React, {Component} from 'react'
import {fetchProducts} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {sneakers: []}
  }
  async componentDidMount() {
    await this.props.getProducts()
    this.setState({sneakers: this.props.products})
  }

  render() {
    return (
      <div className="allSneakers row">
        {this.state.sneakers.map((sneaker) => (
          <div
            key={sneaker.id}
            className="allPageSingleSneaker col-4 col-sm justify-content-center"
          >
            <Link to={`/products/${sneaker.id}`}>
              <img src={sneaker.photos[0]} className=" img-thumbnail" />
              <h3>{sneaker.name}</h3>
              <div>
                Manufacture: {sneaker.manufacturer} <p />
                Style: {sneaker.style} <p />
                Price: {sneaker.price} <p />
                Units in Stock: {sneaker.inventory}
              </div>
            </Link>
          </div>
        ))}
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
