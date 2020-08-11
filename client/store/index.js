import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './all-products'
import users from './all-users'
import cart from './cart'
import product from './single-product'
import guestcart from './guest-cart'
import {loadState, saveState} from './storage'

const persistedState = loadState()

const reducer = combineReducers({
  user,
  users,
  products,
  cart,
  product,
  guestcart,
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, persistedState, middleware)

store.subscribe(() => {
  saveState({
    guestcart: store.getState().guestcart,
  })
})

export default store
export * from './user'
export * from './all-products'
export * from './all-users'
export * from './single-product'
