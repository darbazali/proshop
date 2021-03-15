import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

/*============================================================================
@desc   Create new order
@route  POST /api/orders
@access Private
=============================================================================*/
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrixe,
    taxPrixe,
    shippingPrixe,
    totalPrice,
  } = req.body

  console.log(cartItems)

  if (cartItems & (cartItems.length === 0)) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      user: req.user._id,
      cartItems,
      shippingAddress,
      paymentMethod,
      itemsPrixe,
      taxPrixe,
      shippingPrixe,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

export default { addOrderItems }
