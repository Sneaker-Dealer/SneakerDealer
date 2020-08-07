import axios from 'axios'

const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'

const defaultCart = {}

const getCart = (cart) => ({type: GET_CART, cart})
const updateCart = (cart) => ({type: UPDATE_CART, cart})

export const fetchCart = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/users/${id}/cart`)
      if (data) {
        dispatch(getCart(data))
      } else {
        dispatch(getCart({}))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const changeCart = (id, cart_id, product_id, quantity) => {
  return async (dispatch) => {
    try {
      console.log(id)
      if (quantity > 0) {
        await axios.put(`/api/users/${id}/cart`, {
          cart_id,
          product_id,
          quantity,
        })
      } else {
        console.log(cart_id)
        console.log(product_id)
        await axios.delete(`/api/users/${id}/cart`, {
          data: {cart_id, product_id},
        })
      }
      const {data} = await axios.get(`/api/users/${id}/cart`)
      if (data) {
        dispatch(updateCart(data))
      } else {
        dispatch(updateCart({}))
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
    case UPDATE_CART:
      return action.cart
    default:
      return state
  }
}
