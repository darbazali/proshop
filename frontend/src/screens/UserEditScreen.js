import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { getUserDetails, updateUser } from '../actions/userActions'

import { USER_UPDATE_RESET } from '../constants/userConstants'
import FormContainer from '../components/FormContainer'

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id
  const [isAdmin, setIsAdmin] = useState(false)
  const dispatch = useDispatch()

  const { loading, error, user } = useSelector((state) => state.userDetails)
  const { loading: loadingUpdate, error: errorUpdate, success } = useSelector(
    (state) => state.userUpdateAdmin
  )

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setIsAdmin(isAdmin)
      }
    }
  }, [isAdmin, user, userId, dispatch, history, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>

        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingUpdate && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='isadmin'>
            <Form.Check
              type='checkbox'
              name='isAdmin'
              label='Is Admin'
              checked={isAdmin}
              value={isAdmin}
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
