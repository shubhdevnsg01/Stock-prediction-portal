import axios from 'axios'
import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { Authcontext } from '../AuthProvider'

const Login = () => {
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const[loading,setLoading]=useState(false)
  const[errors,setErrors]=useState("")
  const navigate=useNavigate()
  const{loggedIn,setLoggedIn}=useContext(Authcontext)
  
  const handleLogin = async(e)=>{
  e.preventDefault();
  setLoading(true)
  const userData={username,password}
  // console.log("the page is",userData)
  
  try{
    const response = await axios.post("http://127.0.0.1:8000/api/token/",userData)
    localStorage.setItem('accessToken',response.data.access)
    localStorage.setItem('refreshToken',response.data.refresh)
    console.log("Login successful")
    setLoggedIn(true)
    navigate('/dashboard')
  }
  catch(error){
    console.error("Invalid credentials")
    setErrors("Invalid credentials")
  }finally{
     setLoading(false)
  }
}


  
  return (
    <>
    <div className='container'>
        <div className='row justify-content-center'>
            <div className='col-md-6 bg-light-dark p-5 rounded'>
                <h3 className='text-light text-center mb-4' >
                Login
                </h3>
                <form onSubmit={handleLogin}>
                    <div className='mb-3'>
                    <input type="text" className="form-control mb-3" placeholder="Enter Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    {/* <small>{errors.username && <div className='text-danger'>{errors.username}</div>}</small> */}
                    </div>
                     <div className='mb-5'>
                    <input type="password" className="form-control mb-3" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                    </div>
                     

                    {errors && <div className='text-danger'>{errors}</div>}

                    {loading ?(
                    <button type="submit" className='btn btn-info d-block mx-auto' disabled>Please Wait!</button>
                    ):(
                    <button type="submit" className='btn btn-info d-block mx-auto'>Login</button>
                    )} 
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login
