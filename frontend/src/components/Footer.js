import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>© 2021 proshop by Darbaz Ali</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
