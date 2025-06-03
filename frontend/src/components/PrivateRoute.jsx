import React from 'react'
import { useContext } from 'react'
import { Authcontext } from '../AuthProvider'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
  const {loggedIn}=useContext(Authcontext)

    return loggedIn?(
    children
  ):(<Navigate to='/login'/>)
}

export default PrivateRoute
