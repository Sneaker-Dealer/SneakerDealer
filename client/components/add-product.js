//Admins can add a new product
import React from 'react'
import {addProductThunk} from '../store'
import {connect} from 'react-redux'

import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import {Grid} from '@material-ui/core'
import {Container} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100ch',
    },
  },
})

class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      style: '',
      manufacturer: '',
      description: '',
      price: 0,
      inventory: 0,
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
      inventory: 0,
      photos: '',
    })
  }

  // render() {
  //   return (
  //     <form onSubmit={this.handleSubmit}>
  //       <label htmlFor="name">Product Name:</label>
  //       <input
  //         onChange={this.handleChange}
  //         name="name"
  //         type="text"
  //         value={this.state.name}
  //       />

  //       <label htmlFor="style">Style:</label>
  //       <input
  //         onChange={this.handleChange}
  //         name="style"
  //         type="text"
  //         value={this.state.style}
  //       />

  //       <label htmlFor="manufacturer">Manufacturer:</label>
  //       <input
  //         onChange={this.handleChange}
  //         name="manufacturer"
  //         type="text"
  //         value={this.state.manufacturer}
  //       />

  //       <label htmlFor="description">Description:</label>
  //       <input
  //         onChange={this.handleChange}
  //         name="description"
  //         type="textArea"
  //         value={this.state.description}
  //       />

  //       <label htmlFor="price">Price:</label>
  //       <input
  //         onChange={this.handleChange}
  //         name="price"
  //         type="number"
  //         value={this.state.price}
  //       />

  //       <label htmlFor="inventory">Inventory:</label>
  //       <input
  //         onChange={this.handleChange}
  //         name="inventory"
  //         type="number"
  //         value={this.state.inventory}
  //       />

  //       <label htmlFor="photos">Image URL:</label>
  //       <p>(Separate multiple URLs with a comma)</p>
  //       <input
  //         onChange={this.handleChange}
  //         name="photos"
  //         type="textArea"
  //         value={this.state.photos}
  //       />
  //       <button type="submit">Submit</button>
  //     </form>
  //   )
  // }

  render() {
    const {classes} = this.props

    return (
      <form onSubmit={this.handleSubmit} className={classes.root}>
        <TextField
          id="standard-helperText"
          name="name"
          label="Name"
          onChange={this.handleChange}
          defaultValue={this.state.name}
          inputProps={{style: {fontSize: 14}}}
          InputLabelProps={{style: {fontSize: 14}}}
        />

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Style</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="style"
            label="Style"
            onChange={this.handleChange}
            defaultValue={this.state.style}
            inputProps={{style: {fontSize: 14}}}
          >
            <MenuItem value={'CASUAL'}>CASUAL</MenuItem>
            <MenuItem value={'BASKETBALL'}>BASKETBALL</MenuItem>
            <MenuItem value={'RUNNING'}>RUNNING</MenuItem>
            <MenuItem value={'VINTAGE'}>VINTAGE</MenuItem>
            <MenuItem value={'DESIGNER'}>DESIGNER</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="standard-helperText"
          name="manufacturer"
          label="Manufacturer"
          onChange={this.handleChange}
          defaultValue={this.state.manufacturer}
          inputProps={{style: {fontSize: 14}}}
          InputLabelProps={{style: {fontSize: 14}}}
        />

        <TextField
          id="standard-helperText"
          name="description"
          label="Description"
          onChange={this.handleChange}
          defaultValue={this.state.description}
          inputProps={{style: {fontSize: 14}}}
          InputLabelProps={{style: {fontSize: 14}}}
        />

        <TextField
          id="standard-number"
          name="price"
          label="Price"
          type="number"
          onChange={this.handleChange}
          defaultValue={this.state.price}
          InputLabelProps={{
            shrink: true,
            style: {fontSize: 14},
          }}
          inputProps={{style: {fontSize: 14}}}
        />

        <TextField
          id="standard-number"
          name="inventory"
          label="Inventory"
          type="number"
          onChange={this.handleChange}
          defaultValue={this.state.inventory}
          InputLabelProps={{
            shrink: true,
            style: {fontSize: 14},
          }}
          inputProps={{style: {fontSize: 14}}}
        />

        <TextField
          id="standard-helperText"
          name="photos"
          label="Photos"
          onChange={this.handleChange}
          defaultValue={this.state.photos}
          helperText="Separate URLs with a comma"
          inputProps={{style: {fontSize: 14}}}
          InputLabelProps={{style: {fontSize: 14}}}
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

AddProduct.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(null, mapDispatch)(withStyles(styles)(AddProduct))
