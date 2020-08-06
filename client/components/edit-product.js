//Admins can add a new product
import React from 'react'
import {fetchProducts} from '../store'
import {connect} from 'react-redux'

class EditProduct extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    const products = this.props.products
    console.log('products >>', products)

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Product Name:</label>
        <input
          onChange={this.handleChange}
          name="name"
          type="text"
          // value={this.state.name}
        />

        <label htmlFor="style">Style:</label>
        <input
          onChange={this.handleChange}
          name="style"
          type="text"
          // value={this.state.style}
        />

        <label htmlFor="manufacturer">Manufacturer:</label>
        <input
          onChange={this.handleChange}
          name="manufacturer"
          type="text"
          // value={this.state.manufacturer}
        />

        <label htmlFor="description">Description:</label>
        <input
          onChange={this.handleChange}
          name="description"
          type="textArea"
          // value={this.state.description}
        />

        <label htmlFor="price">Price:</label>
        <input
          onChange={this.handleChange}
          name="price"
          type="number"
          // value={this.state.price}
        />

        <label htmlFor="inventory">Inventory:</label>
        <input
          onChange={this.handleChange}
          name="inventory"
          type="number"
          // value={this.state.inventory}
        />

        <label htmlFor="photos">Image URL:</label>
        <p>(Separate multiple URLs with a comma)</p>
        <input
          onChange={this.handleChange}
          name="photos"
          type="textArea"
          // value={this.state.photos}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  }
}

const mapDispatch = (dispatch) => {
  return {getProducts: () => dispatch(fetchProducts())}
}

export default connect(mapState, mapDispatch)(EditProduct)
