import axios from 'axios'

const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'

const defaultCart = {}

const getCart = (cart) => ({type: GET_CART, cart})
const updateCart = (cart) => ({type: UPDATE_CART, cart})
const addProduct = (cart) => ({type: ADD_PRODUCT, cart})

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

export const addToCart = (id, cart_id, product_id) => {
  return async (dispatch) => {
    try {
      await axios.post(`/api/users/${id}/cart`, {cart_id, product_id})
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

export const changeCart = (id, cart_id, product_id, quantity) => {
  return async (dispatch) => {
    try {
      if (quantity > 0) {
        await axios.put(`/api/users/${id}/cart`, {
          cart_id,
          product_id,
          quantity,
        })
      } else {
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
    case ADD_PRODUCT:
      return action.cart
    default:
      return state
  }
}
