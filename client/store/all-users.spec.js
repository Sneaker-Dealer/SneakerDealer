import {expect} from 'chai'
import {getAllUsers, fetchAllUsers} from './all-users'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('All Users ', () => {
  let store
  let mockAxios

  //sample users for running test
  const initialState = {
    users: [
      {id: 1, name: 'cody', email: 'cody@email.com'},
      {id: 2, name: 'admin', email: 'admin@email.com'}
    ]
  } //check this

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetch all users thunk', () => {
    it('eventually dispatches the GET_ALL_USERS action', async () => {
      mockAxios.onGet('/api/users').replyOnce(200, initialState.users)
      await store.dispatch(fetchAllUsers()) //dispatch thunk
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_USERS')
      expect(actions[0].users.length).to.be.equal(2)
    })
  })
})
