import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

import Product from '../components/Product'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const { loading, error, products } = useSelector((state) => state.productList)

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>Loading..</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
