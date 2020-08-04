import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/all-users'

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    let users = this.props.users

    return (
      <div>
        <h3>All Users:</h3>
        {users.length === 0 && <h3>No users available</h3>}

        {users.map(user => {
          return (
            <div key={user.id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(fetchAllUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
