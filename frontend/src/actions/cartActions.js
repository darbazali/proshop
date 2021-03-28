import axios from 'axios'

import { CART_ADD_ITEM } from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  // get product details by sending a GET request to /api/products/:id
  const { data } = await axios.get(`/api/products/${id}`)

  //   dispatch the action, then add product details to payload
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  //   add the item to localStorage in order to be rememberd by the browser
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
