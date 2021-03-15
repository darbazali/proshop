import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

/*=======================================
REDUCERS | PRODUCT
========================================*/
import {
  productListReducer,
  productDetailReducer,
} from './reducers/productReducers'

/*=======================================
REDUCERS | CART
========================================*/
import { cartReducer } from './reducers/cartReducers'
/*=======================================
REDUCERS | USERS
========================================*/
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'

/*=======================================
REDUCERS | STATE
========================================*/
const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
})

/*=======================================
GET INITIAL STATE FROM LOCAL STORAGE
========================================*/
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
/*=======================================
GET USER INFO FROM STORAGE
========================================*/
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
/*=======================================
GET SHIPPING ADDRESS FROM STOREAGE
========================================*/
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}
/*=======================================
GET PAYMENT METHOD FROM STOREAGE
========================================*/
const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
