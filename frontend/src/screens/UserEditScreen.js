import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { getUserDetails } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id
  const [isAdmin, setIsAdmin] = useState(false)
  const dispatch = useDispatch()

  const { loading, error, user } = useSelector((state) => state.userDetails)

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId))
    } else {
      setIsAdmin(isAdmin)
    }
  }, [isAdmin, user, userId, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>

        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='isadmin'>
            <Form.Check
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type='submit'>Update</Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default UserEditScreen
