import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, addNewUser} from '../store'
import history from '../history'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div
      className="page-header header-filter"
      style={{
        backgroundImage: "url('../resources/assets/img/all_v1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
            <div className="card card-signup">
              <form className="form" onSubmit={handleSubmit} name={name}>
                <div
                  className="header header-primary text-center"
                  style={{display: 'block'}}
                >
                  <h4 className="card-title">{displayName}</h4>
                  <div className="social-line">
                    <a
                      href="/auth/google"
                      className="btn btn-just-icon btn-simple"
                    >
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </div>
                </div>
                <p className="description text-center">Or</p>
                <div className="card-content">
                  {name !== 'login' && (
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="material-icons">face</i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        placeholder="First Name..."
                      />
                    </div>
                  )}

                  {name !== 'login' && (
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="material-icons">face</i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        placeholder="Last Name..."
                      />
                    </div>
                  )}

                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="material-icons">email</i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Email..."
                    />
                  </div>

                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="material-icons">lock_outline</i>
                    </span>
                    <input
                      type="password"
                      placeholder="Password..."
                      name="password"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="footer text-center" style={{display: 'block'}}>
                  <button type="submit">Submit</button>
                </div>
                {error && error.response && <div> {error.response.data} </div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  }
}

const mapDispatchLogin = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    },
  }
}

const mapDispatchSignUp = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const email = evt.target.email.value
      const password = evt.target.password.value

      //dispatches the thunk to add a new user
      dispatch(addNewUser({firstName, lastName, email, password}))

      history.push('/login')
    },
  }
}

export const Login = connect(mapLogin, mapDispatchLogin)(AuthForm)
export const Signup = connect(mapSignup, mapDispatchSignUp)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
