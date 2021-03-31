import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const { loading, error, products } = useSelector(
    (state) => state.productTopRated
  )

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark mt-3 mb-5'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/products/${product._id}`}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <Image src={product.image} alt={product.name} fluid />

              <h3
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  maxWidth: '300px',
                  marginTop: '200px',
                  marginRight: '120px',
                }}
              >
                {product.name} (${product.price})
              </h3>
            </div>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
