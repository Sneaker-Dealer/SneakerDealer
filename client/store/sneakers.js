import axios from 'axios'
// import history from '../history'

const defaultSneakers = {}

const GET_SNEAKERS = 'GET_SNEAKERS'

const getSneakers = sneakers => ({type: GET_SNEAKERS, sneakers})

// thunk
export const fetchSneakers = () => async dispatch => {
  console.log('thunked>> ')
  try {
    const {data: sneakers} = await axios.get('/api/sneakers')
    console.log('thunked>> ', sneakers)
    dispatch(getSneakers(sneakers))
  } catch (err) {
    console.log(err)
  }
}

// reducer
export default function(state = defaultSneakers, action) {
  switch (action.type) {
    case GET_SNEAKERS:
      return action.sneakers
    default:
      return state
  }
}
