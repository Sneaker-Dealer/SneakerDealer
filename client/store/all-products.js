import axios from 'axios'
// import history from '../history'

const defaultProducts = {}

const GET_PRODUCTS = 'GET_PRODUCTS'

const getProducts = (products) => ({type: GET_PRODUCTS, products})

// thunk
export const fetchProducts = () => async (dispatch) => {
  try {
    const {data: products} = await axios.get('/api/products')
    dispatch(getProducts(products))
  } catch (err) {
    console.log(err)
  }
}

// reducer
export default function (state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
