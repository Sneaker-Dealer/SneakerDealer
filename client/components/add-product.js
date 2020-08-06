//Admins can add a new product
import React from 'react'
import {addProductThunk} from '../store'
import {connect} from 'react-redux'

class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      style: '',
      manufacturer: '',
      description: '',
      price: '',
      inventory: '',
      photos: '',
    }
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

    //get the user input for the following fields from the local state
    const {
      name,
      style,
      manufacturer,
      description,
      price,
      inventory,
      photos,
    } = this.state

    const newProduct = {
      name,
      style,
      manufacturer,
      description,
      price,
      inventory,
      photos: photos.split(', '),
    }

    this.props.addProduct(newProduct)

    //reset the fields
    this.setState({
      name: '',
      style: '',
      manufacturer: '',
      description: '',
      price: 0,
      inventory: '',
      photos: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Product Name:</label>
        <input
          onChange={this.handleChange}
          name="name"
          type="text"
          value={this.state.name}
        />

        <label htmlFor="style">Style:</label>
        <input
          onChange={this.handleChange}
          name="style"
          type="text"
          value={this.state.style}
        />

        <label htmlFor="manufacturer">Manufacturer:</label>
        <input
          onChange={this.handleChange}
          name="manufacturer"
          type="text"
          value={this.state.manufacturer}
        />

        <label htmlFor="description">Description:</label>
        <input
          onChange={this.handleChange}
          name="description"
          type="textArea"
          value={this.state.description}
        />

        <label htmlFor="price">Price:</label>
        <input
          onChange={this.handleChange}
          name="price"
          type="number"
          value={this.state.price}
        />

        <label htmlFor="inventory">Inventory:</label>
        <input
          onChange={this.handleChange}
          name="inventory"
          type="number"
          value={this.state.inventory}
        />

        <label htmlFor="photos">Image URL:</label>
        <p>(Separate multiple URLs with a comma)</p>
        <input
          onChange={this.handleChange}
          name="photos"
          type="textArea"
          value={this.state.photos}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    addProduct: (newProduct) => dispatch(addProductThunk(newProduct)),
  }
}

export default connect(null, mapDispatch)(AddProduct)
