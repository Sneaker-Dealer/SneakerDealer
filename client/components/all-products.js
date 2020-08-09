import React, { useState, useEffect } from 'react'
import { fetchProducts } from '../store'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const AllProducts = (props) => {
  // using hook for state
  const [style, setStyle] = useState("All")

  // same as component did mount
  useEffect(() => {
    props.getProducts()
  }, [])

  const handleChange = evt => {
    setStyle(evt.target.value)
  }

    const { products } = props
    const useStyles = makeStyles((theme) => ({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        float: 'right'
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },

    }));
    const imageStyle = (product) => ({
      backgroundImage: `url(${product.photos[0]})`,
      width: "100%",
      height: "280px",
    })
    const classes = useStyles();
    return (
      <div className="blog-posts">
        <div
          className="page-header header-filter header-small"
          style={{ backgroundImage: `url("../resources/assets/img/all_v5.jpg")` }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center">
                <h2 className="title">One shoe can change your life.</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="main main-raised">
          <div className="container">
            <div className="section">
              <div className="nav nav-bar">
                <div>
                  <h2 className="navbar-header" style={{ textAlign: 'center' }}>
                    Currently Available
                  </h2>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Style</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={style}
                        onChange={handleChange}
                        label="Style"
                      >
                        <MenuItem value="All">
                          <em>All</em>
                        </MenuItem>
                        <MenuItem value='BASKETBALL'>Basketball</MenuItem>
                        <MenuItem value='CASUAL'>Casual</MenuItem>
                        <MenuItem value='RUNNING'>Running</MenuItem>
                        <MenuItem value='VINTAGE'>Vintage</MenuItem>
                        <MenuItem value='DESIGNER'>Designer</MenuItem>
                      </Select>
                  </FormControl>
                </div>
              </div>
              <div className="row">
                {products.filter(product => product.style === style || style === 'All').map((product) => {
                  return (
                    <div className="col-md-4"  key={product.id}>
                      <div className="card-block">
                        <div
                          className="card card-raised card-background"
                          style={imageStyle(product)}
                        >
                          <div className="card-body ">
                          <div className="card-content" style={{paddingTop: "0px"}}>
                            {/* this wasn't showing due to typo */}
                            {/* <Link
                              to={
                                '/products/manufacturer/' + product.manufacturer
                              }
                            >
                              <h6 className="category text-info">
                                {product.manufacturer}
                                 this wasnt showing due to typo
                              </h6>
                            </Link> */}

                            <h3 className="card-title" style={{marginBottom: "0px"}}>{product.name}</h3>
                            <h5 className="card-pricing" style={{color: "white"}}>${product.price}</h5>
                            <p className="card-description" style={{paddingTop: "1.7em"}}>
                              {product.description.length < 50
                                ? product.description
                                : product.description.slice(0, 50) + '...'}
                            </p>
                            <Link
                              className="btn btn-danger btn-round "
                              to={'/products/' + product.id}
                            >
                              View Product
                            </Link>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

const mapDispatch = (dispatch) => {
  return { getProducts: () => dispatch(fetchProducts()) }
}

const mapState = (state) => {
  return {
    products: state.products,
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
