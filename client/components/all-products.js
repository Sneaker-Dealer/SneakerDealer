import React, {Component} from 'react'
import {fetchProducts} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import GridContainer from '../materialkit/components/Grid/GridContainer.js'
import GridItem from '../materialkit/components/Grid/GridItem.js'
import Paper from '@material-ui/core/Paper'
import Parallax from '../materialkit/components/Parallax.js'
import styles from '../materialkit/assets/jss/material-kit-react/components/parallaxStyle.js'

const useStyles = makeStyles(styles)

const AllProducts = (props) => {
  // similar to component did mount but does not require class
  React.useEffect(() => {
    props.getProducts()
  }, [])
  const classes = useStyles()
  const {products} = props
  return (
    <div>
      <Parallax image="https://www.zapatillukas.es/wp-content/uploads/2019/06/daniel-storek-1552081-unsplash-scaled.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>SneakerDealer</h1>
                <h3 className={classes.subtitle}>
                  The Ultimate Shoe Buying Experience
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className="container">
        <Paper elevation={4}>
          <div className="allSneakers row">
            {products.map((sneaker) => (
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
        </Paper>
      </div>
    </div>
  )
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
//<span>Photo by <a href="https://unsplash.com/@causeweplay?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Daniel Storek</a> on <a href="https://unsplash.com/s/photos/sneaker?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
