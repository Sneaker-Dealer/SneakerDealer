import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/all-users'

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    console.log('PROPS', this.props)
    console.log('USERS', this.props.users)
    return (
      <div>
        <h3>---- ALL USERS ----</h3>
      </div>
    )
  }
}

const mapState = state => {
  console.log('STATE', state)

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
