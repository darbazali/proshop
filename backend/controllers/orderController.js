import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

/*============================================================================
@desc   Create new order
@route  POST /api/orders
@access Private
=============================================================================*/
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

  if (orderItems & (orderItems.length === 0)) {
    res.status(400)
    throw new Error('No order items')
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

/*============================================================================
@desc   Get order by ID
@route  GET /api/orders/:id
@access Private
=============================================================================*/
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
/*============================================================================
@desc   Update order to paid
@route  PUT /api/orders/:id
@access Private

paymentResult: {
      id: { type: String },
      stat us: { type: String },
      update_time: { type: String },
      email_address: { type: String },
=============================================================================*/
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const { id, status, source } = req.body

  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: id,
      status: status,
      update_time: Date.now(),
      email_address: source.name,
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export default { addOrderItems, getOrderById, updateOrderToPaid }
