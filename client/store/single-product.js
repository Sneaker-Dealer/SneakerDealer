import axios from 'axios'

// Action Types
const GET_PRODUCT = 'GET_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

// Action Creator
export function getProduct(product) {
  return {
    type: GET_PRODUCT,
    product,
  }
}

export function updateProduct(product) {
  return {
    type: UPDATE_PRODUCT,
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

export const updateSingleProduct = (id, updatedData) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/products/${id}`, updatedData)
      dispatch(updateProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// Reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case UPDATE_PRODUCT:
      return action.product
    default:
      return state
  }
}
