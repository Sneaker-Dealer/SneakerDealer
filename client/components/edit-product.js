//Admins can add a new product
import React from 'react'
import {fetchProducts} from '../store'
import {deleteProductThunk} from '../store/all-products'
import {fetchSingleProduct, updateSingleProduct} from '../store/single-product'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {
  Grid,
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  IconButton,
  Button,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

//Material UI styling
import styles from '../admin-styles'

const tableColumns = [
  {id: 'name', label: 'NAME', minWidth: 100},
  {id: 'style', label: 'STYLE', minWidth: 100},
  {id: 'price', label: 'PRICE', minWidth: 60},
  {id: 'edit', label: 'EDIT', minWidth: 10},
  {id: 'delete', label: 'DELETE', minWidth: 10},
]

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
  }

  async handleDeleteButton(id) {
    await this.props.deleteProduct(id)
    await this.props.getProducts()
  }

  render() {
    const {classes} = this.props

    return (
      <div
        style={{
          backgroundImage: `url("../resources/assets/img/all_v2.jpg")`,
          marginBottom: '-5000x',
        }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          style={{
            paddingTop: '150px',
            paddingBottom: '100px',
          }}
        >
          <Paper elevation={3}>
            <Box p={5}>
              <Grid container direction="row">
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h5"
                    className={classes.title}
                    style={{fontWeight: 100}}
                  >
                    EDIT PRODUCT
                  </Typography>
                  <form onSubmit={this.handleSubmit} className={classes.root}>
                    <TextField
                      name="name"
                      label="Name"
                      onChange={this.handleChange}
                      value={this.state.name}
                      InputProps={{className: classes.itemText}}
                      InputLabelProps={{className: classes.itemText}}
                    />

                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">
                        Style
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="style"
                        label="Style"
                        style={{fontSize: 12, fontWeight: 100}}
                        onChange={this.handleChange}
                        value={this.state.style}
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
                      InputProps={{className: classes.itemText}}
                      InputLabelProps={{className: classes.itemText}}
                    />

                    <TextField
                      id="standard-helperText"
                      name="description"
                      label="Description"
                      onChange={this.handleChange}
                      value={this.state.description}
                      InputProps={{className: classes.itemText}}
                      InputLabelProps={{className: classes.itemText}}
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
                        className: classes.itemText,
                      }}
                      InputProps={{className: classes.itemText}}
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
                        className: classes.itemText,
                      }}
                      InputProps={{className: classes.itemText}}
                    />

                    <TextField
                      id="standard-helperText"
                      name="photos"
                      label="Photos"
                      onChange={this.handleChange}
                      value={this.state.photos}
                      helperText="Separate URLs with a comma"
                      InputProps={{className: classes.itemText}}
                      InputLabelProps={{className: classes.itemText}}
                    />

                    <Button type="submit" className="btn btn-info btn-round">
                      Submit
                    </Button>
                  </form>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TableContainer style={{padding: '20px'}}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {tableColumns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              className={classes.itemText}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {this.props.products.map((product) => {
                          return (
                            <TableRow key={product.id}>
                              {tableColumns.map((column) => {
                                const value = product[column.id]
                                return (
                                  <TableCell
                                    key={product.id + column.id}
                                    className={classes.itemText}
                                  >
                                    {typeof value === 'number'
                                      ? '$ ' + value
                                      : value}

                                    {column.id === 'edit' && (
                                      <IconButton
                                        onClick={() =>
                                          this.handleEditButton(product.id)
                                        }
                                      >
                                        <EditIcon />
                                      </IconButton>
                                    )}

                                    {column.id === 'delete' && (
                                      <IconButton
                                        onClick={() =>
                                          this.handleDeleteButton(product.id)
                                        }
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    )}
                                  </TableCell>
                                )
                              })}
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
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
    updateSingleProduct: (id, updatedData) =>
      dispatch(updateSingleProduct(id, updatedData)),
    deleteProduct: (id) => dispatch(deleteProductThunk(id)),
  }
}

EditProduct.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapState, mapDispatch)(withStyles(styles)(EditProduct))
