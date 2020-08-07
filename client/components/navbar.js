import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {makeStyles} from '@material-ui/core/styles'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
// // @material-ui/icons
// import Menu from "@material-ui/icons/Menu";
// core components
import styles from '../materialkit/assets/jss/material-kit-react/components/headerStyle'
const useStyles = makeStyles(styles)

const Navbar = (props) => {
  const classes = useStyles()
  const {
    isLoggedIn,
    handleClick,
    userId,
    isAdmin,
    color,
    fixed,
    absolute,
  } = props

  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener('scroll', headerColorChange)
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener('scroll', headerColorChange)
      }
    }
  })

  const headerColorChange = () => {
    const {color, changeColorOnScroll} = props
    const windowsScrollTop = window.pageYOffset
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName('header')[0]
        .classList.remove(classes[color])
      document.body
        .getElementsByTagName('header')[0]
        .classList.add(classes[changeColorOnScroll.color])
    } else {
      document.body
        .getElementsByTagName('header')[0]
        .classList.add(classes[color])
      document.body
        .getElementsByTagName('header')[0]
        .classList.remove(classes[changeColorOnScroll.color])
    }
  }
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed, // this
  })
  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        <div id="navbar">
          <h1>SNEAKER DEALER</h1>

          <nav>
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <Link to="/cart">Cart</Link>
                {/* If admin, show view users option */}
                {isAdmin && <Link to="/users">View Users</Link>}
                {isAdmin && <Link to="/add-product">Add Product</Link>}
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
          </nav>
          <hr />
        </div>
      </Toolbar>
    </AppBar>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    isAdmin: !!state.user.isAdmin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
