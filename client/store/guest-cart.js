const defaultCart = []

// const GET_CART = 'GET_CART'
const UPDATE_GUEST_CART = 'UPDATE_GUEST_CART'
// const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_GUEST_PRODUCT = 'REMOVE_GUEST_PRODUCT'

// const getCart = (cart) => ({ type: GET_CART, cart })
const updateCart = (product) => ({ type: UPDATE_GUEST_CART, product })
const removeProduct = (product) => ({ type: REMOVE_GUEST_PRODUCT, product })

export const guestAddToCart = (product) => {
    return (dispatch) => {
        try {
            let addedProduct = product
            addedProduct = {...product, Product_Cart: {quantity: 1}}
            dispatch(updateCart(addedProduct))
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

export default function (state = defaultCart, action) {
    switch (action.type) {
        // case GET_CART:
        //     return action.guestcart
        case UPDATE_GUEST_CART:
            return [...state.filter(product => product != action.product), action.product]
        case REMOVE_GUEST_PRODUCT:
            return [...state.filter(product => product != action.product)]
        default:
            return state
    }
}