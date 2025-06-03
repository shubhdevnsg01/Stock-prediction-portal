import React from 'react'
import { useContext } from 'react'
import { Authcontext } from '../AuthProvider'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
  const {loggedIn}=useContext(Authcontext)
  
      return !loggedIn?(
      children
    ):(<Navigate to='/dashboard'/>)
  }

export default PublicRoute
