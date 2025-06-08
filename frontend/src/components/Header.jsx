import React, { useContext } from 'react'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { Authcontext } from '../AuthProvider'


const Header = () => {
  const {loggedIn,setLoggedIn}=useContext(Authcontext)
  const navigate= useNavigate()

  const handleLogout =()=>{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setLoggedIn(false)
    console.log("logout")
    navigate('/login')
  }
  return (
    <>
    <nav className='navbar container pt-3 pb-3 align-items-start'>
        <Link className='navbar-brand text-light' to="/">Stock Prediction Portal</Link>
    <div>
      {loggedIn?(
        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
      ):(
        <>
        <Button text='Register' class='btn-info' url="/Register"/>
        </>
      )}
       
    </div>
    </nav>
    </>
  )
}

export default Header
