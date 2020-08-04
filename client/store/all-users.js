import axios from 'axios'

/* Admin: View All Users */

//Action Type
const GET_ALL_USERS = 'GET_ALL_USERS'

//Action Creator
const getAllUsers = users => ({type: GET_ALL_USERS, users})

//Thunk Creator
export const fetchAllUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(getAllUsers(data))
  } catch (err) {
    console.error(err)
  }
}

const initialState = []

//Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}
