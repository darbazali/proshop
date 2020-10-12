import React from 'react'
import { Row, Col } from 'react-bootstrap'
import products from '../products'
import Product from '../components/Product'
const HomeScreen = () => {
    return (
        <>
            <h1>Latest Products</h1>]
            <Row>
                {products.map((product) => (
                    <Col ms={12} md={6} lg={4}>
                        {/* <h3>{product.name}</h3> */}
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
