import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {
  productDetailsReducer,
  productListReducer,
} from './reducers/productReducers'

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
})

const initialState = {}
const middleware = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
