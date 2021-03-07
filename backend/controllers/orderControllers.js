import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc     Create new Order
// @route   POST /api/orders
// @access  private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})
// @desc     Create order by id
// @route   GET /api/orders/:id
// @access  private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    return res.status(200).json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export { addOrderItems, getOrderById }
