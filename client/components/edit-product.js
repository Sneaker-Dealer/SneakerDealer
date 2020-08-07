//Admins can add a new product
import React from 'react'
import {fetchProducts} from '../store'
import {fetchSingleProduct} from '../store/single-product'
import {connect} from 'react-redux'

class EditProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      style: '',
      manufacturer: '',
      description: '',
      price: 0,
      inventory: 1,
      photos: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEditButton = this.handleEditButton.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
    this.props.getSingleProduct(3) //hardcode data for testing
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  async handleEditButton(id) {
    // event.preventDefault()
    console.log('button clicked', id)
    //TESTING SINGLE PRODUCT LINK with hard coded data
    console.log('TESTING ---->', this.props.product)

    this.setState({
      name: 'a',
      style: 'b',
      manufacturer: 'c',
      description: 'd',
      price: 0,
      inventory: 1,
      photos: 'g',
    })
    console.log('new state', this.state)
  }

  render() {
    const products = this.props.products
    console.log('THIS PROPS >>>', this.props)

    return (
      <div>
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
          <input
            onChange={this.handleChange}
            name="photos"
            type="textArea"
            value={this.state.photos}
          />
          <button type="submit">Submit</button>
        </form>

        <div>
          {this.props.products.map((product) => {
            return (
              <div key={product.id}>
                <p>{product.name}</p>
                {/* <button onClick={this.handleEditButton} type="submit"> */}
                {/* <button
                  onClick={() => console.log('ID IS ', product.id)}
                  type="submit"
                > */}
                <button
                  onClick={() => this.handleEditButton(product.id)}
                  type="button"
                >
                  Edit
                </button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    product: state.product,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  }
}

export default connect(mapState, mapDispatch)(EditProduct)
