import axios from 'axios'

const GET_CART = 'GET_CART'

const defaultCart = {}

const getCart = (cart) => ({type: GET_CART, cart})

export const fetchCart = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/users/${id}/cart`)
      if (data) {
        dispatch(getCart(data.cart))
      } else {
        dispatch(getCart({}))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default function (state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
