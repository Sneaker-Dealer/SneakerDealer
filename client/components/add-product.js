//Admins can add a new product
import React from 'react'
import {addProductThunk, fetchProducts} from '../store'
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
  itemText: {
    fontSize: '.9em',
    fontWeight: 100,
  },
})

const tableColumns = [
  {id: 'id', label: 'ID', minWidth: 60},
  {id: 'name', label: 'NAME', minWidth: 100},
  {id: 'style', label: 'STYLE', minWidth: 100},
  {id: 'price', label: 'PRICE', minWidth: 60},
]

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

    await this.props.addProduct(newProduct)

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

    await this.props.getProducts()
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
                    ADD PRODUCT
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

                    <Button type="submit" className="btn btn-danger btn-round">
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
                                    {column.id === 'price'
                                      ? '$ ' + value
                                      : value}
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
  return {products: state.products}
}

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    addProduct: (newProduct) => dispatch(addProductThunk(newProduct)),
  }
}

AddProduct.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapState, mapDispatch)(withStyles(styles)(AddProduct))
