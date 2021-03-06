import history from '../history'
import axios from 'axios'

const defaultCart = []

const UPDATE_GUEST_CART = 'UPDATE_GUEST_CART'
const REMOVE_GUEST_PRODUCT = 'REMOVE_GUEST_PRODUCT'
const ADD_GUEST_PRODUCT = 'ADD_GUEST_PRODUCT'
const NEW_GUEST_CART = 'NEW_GUEST_CART'

const updateCart = (product) => ({ type: UPDATE_GUEST_CART, product })
const removeProduct = (product) => ({ type: REMOVE_GUEST_PRODUCT, product })
const addProduct = (product) => ({ type: ADD_GUEST_PRODUCT, product })
const newCart = () => ({type: NEW_GUEST_CART})

export const guestAddToCart = (product) => {
    return (dispatch) => {
        try {
            let addedProduct = product
            addedProduct = { ...product, Product_Cart: { quantity: 1 } }
            dispatch(addProduct(addedProduct))
            history.push('/cart')
        } catch (error) {
            console.log(error)
        }
    }
}

export const guestChangeCart = (product, quantity) => {
    return (dispatch) => {
        try {
            let changedProduct = product
            changedProduct.Product_Cart.quantity = quantity
            if (quantity <= 0) {
                dispatch(removeProduct(product))
            }
            else {
                dispatch(updateCart(product))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const newGuestCart = (guestcart,customerinfo) => {
    return async (dispatch) => {
        try {
            await axios.post(`/api/guest/cart`,{guestcart,...customerinfo})
            dispatch(newCart())
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
}

export default function (state = defaultCart, action) {
    switch (action.type) {
        case ADD_GUEST_PRODUCT:
            return [...state.filter(product => product.id != action.product.id), action.product]
        case UPDATE_GUEST_CART:
            return [...state.map(product => {
                if (product == action.product) {
                    return action.product
                }
                return product
            })]
        case REMOVE_GUEST_PRODUCT:
            return [...state.filter(product => product != action.product)]
        case NEW_GUEST_CART:
            return defaultCart
        default:
            return state
    }
}