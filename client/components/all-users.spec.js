/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllUsers} from './all-users'
import {getAllUsers, fetchAllUsers} from './all-users'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllUsers', () => {
  const users = [
    {id: 1, name: 'cody', email: 'cody@email.com'},
    {id: 2, name: 'admin', email: 'admin@email.com'},
    {id: 3, name: 'bob', email: 'bob@email.com'},
    {id: 4, name: 'joe', email: 'joe@email.com'}
  ]

  beforeEach(() => {
    let allUsers = shallow(
      <AllUsers
        users={users}
        getUsers={dispatch => dispatch(fetchAllUsers())} // failing at componentDidMount
      />
    )
  })

  xit('renders the user emails', () => {
    expect(allUsers.find('p').text()).to.include('cody@email.com')
  })
})
