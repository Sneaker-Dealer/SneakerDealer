import axios from 'axios'

// Action Types
const GET_PRODUCT = 'GET_PRODUCT'

// Action Creator
export function getProduct(product) {
  return {
    type: GET_PRODUCT,
    product,
  }
}

// Thunk Creator
export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(getProduct(data))
    } catch (error) {
      console.log('ERROR FETCHING PRODUCT>>>', error)
    }
  }
}

// Reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
//
