import axios from 'axios'
// import history from '../history'

const defaultProducts = []

const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

const getProducts = (products) => ({type: GET_PRODUCTS, products})
const addProduct = (newProduct) => ({type: ADD_PRODUCT, newProduct})

// thunk
export const fetchProducts = () => async (dispatch) => {
  try {
    const {data: products} = await axios.get('/api/products')
    dispatch(getProducts(products))
  } catch (err) {
    console.log(err)
  }
}

// thunk for adding product
export const addProductThunk = (newProduct) => async (dispatch) => {
  try {
    const {data} = await axios.post('/api/products', newProduct)
    dispatch(addProduct(data))
  } catch (err) {
    console.log(err)
  }
}

// reducer
// export default function (state = defaultProducts, action) {
export default function (state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.newProduct]
    default:
      return state
  }
}
