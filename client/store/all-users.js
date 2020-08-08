import axios from 'axios'

/* Admin: View All Users */

//Action Type
const GET_ALL_USERS = 'GET_ALL_USERS'
const ADD_USER = 'ADD_USER'

//Action Creator
const getAllUsers = (users) => ({type: GET_ALL_USERS, users})
const addUser = (user) => ({type: ADD_USER, user})

//Thunk Creator
export const fetchAllUsers = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(getAllUsers(data))
  } catch (err) {
    console.error(err)
  }
}

export const addNewUser = (newUser) => async (dispatch) => {
  try {
    const {data} = await axios.post(`/api/users`, newUser)
    dispatch(addUser(data))
  } catch (err) {
    console.error(err)
  }
}

const initialState = []

//Reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case ADD_USER:
      return [...state, action.user]
    default:
      return state
  }
}
