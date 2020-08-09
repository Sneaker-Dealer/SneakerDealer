//Admins can add a new product
import React from 'react'
import {fetchProducts} from '../store'
import {fetchSingleProduct, updateSingleProduct} from '../store/single-product'
import {connect} from 'react-redux'

import {Grid} from '@material-ui/core'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  listItemText: {
    fontSize: '1em',
  },
})

class EditProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      productId: 0,
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
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  async handleSubmit(event) {
    event.preventDefault()

    const updatedData = {}
    //iterate over this.state to store the updated form data in a new object
    for (const [key, value] of Object.entries(this.state)) {
      if (key !== 'productId' && value !== '') {
        updatedData[key] = value
      }
    }

    await this.props.updateSingleProduct(this.state.productId, updatedData)

    this.setState({
      productId: 0,
      name: '',
      style: '',
      manufacturer: '',
      description: '',
      price: 0,
      inventory: 1,
      photos: '',
    })

    await this.props.getProducts()
  }

  async handleEditButton(id) {
    await this.props.getSingleProduct(id)
    this.setState({productId: id})
    console.log('TESTING ---->', this.props.product)

    let product = this.props.product
    this.setState({
      name: product.name,
      style: product.style,
      manufacturer: product.manufacturer,
      description: product.description,
      price: product.price,
      inventory: product.inventory,
      photos: product.photos,
    })
    console.log('new state', this.state)
  }

  // render() {
  //   const products = this.props.products
  //   console.log('THIS PROPS >>>', this.props)

  //   return (
  //     <div>
  //       <Grid container spacing={3} direction="row">
  //         <Grid item xs={12}>
  //           <form onSubmit={this.handleSubmit}>
  //             <label htmlFor="name">Product Name:</label>
  //             <input
  //               onChange={this.handleChange}
  //               name="name"
  //               type="text"
  //               value={this.state.name}
  //             />

  //             <label htmlFor="style">Style:</label>
  //             <input
  //               onChange={this.handleChange}
  //               name="style"
  //               type="text"
  //               value={this.state.style}
  //             />

  //             <label htmlFor="manufacturer">Manufacturer:</label>
  //             <input
  //               onChange={this.handleChange}
  //               name="manufacturer"
  //               type="text"
  //               value={this.state.manufacturer}
  //             />

  //             <label htmlFor="description">Description:</label>
  //             <input
  //               onChange={this.handleChange}
  //               name="description"
  //               type="textArea"
  //               value={this.state.description}
  //             />

  //             <label htmlFor="price">Price:</label>
  //             <input
  //               onChange={this.handleChange}
  //               name="price"
  //               type="number"
  //               value={this.state.price}
  //             />

  //             <label htmlFor="inventory">Inventory:</label>
  //             <input
  //               onChange={this.handleChange}
  //               name="inventory"
  //               type="number"
  //               value={this.state.inventory}
  //             />

  //             <label htmlFor="photos">Image URL:</label>
  //             <input
  //               onChange={this.handleChange}
  //               name="photos"
  //               type="textArea"
  //               value={this.state.photos}
  //             />
  //             <button type="submit">Submit</button>
  //           </form>
  //         </Grid>
  //       </Grid>
  //       <div>
  //         {this.props.products.map((product) => {
  //           return (
  //             <div key={product.id}>
  //               <p>{product.name}</p>

  //               <button
  //                 onClick={() => this.handleEditButton(product.id)}
  //                 type="button"
  //               >
  //                 Edit
  //               </button>
  //             </div>
  //           )
  //         })}
  //       </div>
  //     </div>
  //   )
  // }

  render() {
    const products = this.props.products
    const {classes} = this.props

    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        style={{paddingTop: '100px'}}
      >
        <Paper elevation={3}>
          <Box p={5}>
            <Grid container direction="row">
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" className={classes.title}>
                  Edit Product:
                </Typography>
                <form onSubmit={this.handleSubmit} className={classes.root}>
                  <TextField
                    id="standard-helperText"
                    name="name"
                    label="Name"
                    onChange={this.handleChange}
                    value={this.state.name}
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
                      value={this.state.style}
                      //TO DO: CHANGE FONT SIZE
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
                    value={this.state.manufacturer}
                    inputProps={{style: {fontSize: 14}}}
                    InputLabelProps={{style: {fontSize: 14}}}
                  />

                  <TextField
                    id="standard-helperText"
                    name="description"
                    label="Description"
                    onChange={this.handleChange}
                    value={this.state.description}
                    inputProps={{style: {fontSize: 14}}}
                    InputLabelProps={{style: {fontSize: 14}}}
                  />

                  <TextField
                    id="standard-number"
                    name="price"
                    label="Price"
                    type="number"
                    onChange={this.handleChange}
                    value={this.state.price}
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
                    value={this.state.inventory}
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
                    value={this.state.photos}
                    helperText="Separate URLs with a comma"
                    inputProps={{style: {fontSize: 14}}}
                    InputLabelProps={{style: {fontSize: 14}}}
                  />

                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </form>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h5" className={classes.title}>
                  All Products:
                </Typography>

                <div>
                  {this.props.products.map((product) => {
                    return (
                      <div className={classes.root} key={product.id}>
                        <List>
                          <ListItem>
                            <ListItemIcon>
                              <PlayArrowIcon />
                            </ListItemIcon>
                            <ListItemText
                              classes={{primary: classes.listItemText}}
                            >
                              <p>{product.name}</p>
                            </ListItemText>
                            <Button
                              variant="contained"
                              color="primary"
                              disableElevation
                              onClick={() => this.handleEditButton(product.id)}
                            >
                              Edit
                            </Button>

                            <Button
                              variant="contained"
                              color="secondary"
                              disableElevation
                              // onClick={} //delete function
                            >
                              Delete
                            </Button>
                          </ListItem>
                        </List>
                      </div>
                    )
                  })}
                </div>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
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
    updateSingleProduct: (id, updatedData) =>
      dispatch(updateSingleProduct(id, updatedData)),
  }
}

EditProduct.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapState, mapDispatch)(withStyles(styles)(EditProduct))
