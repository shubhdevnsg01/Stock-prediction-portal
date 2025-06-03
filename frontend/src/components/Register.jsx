import React, { useState } from 'react'
import axios from "axios"

const Register = () => {
  const[username,setUsername]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[errors,setErrors]=useState({})
  const[success,setSuccess]=useState("")
  const[loading,setLoading]=useState(false)

  const handleRegistraion = async(e)=>{
    e.preventDefault()
    setLoading(true)
    const userData={
        username,email,password
    }
    try {
       const response= await axios.post("http://127.0.0.1:8000/api/register/",userData)
       console.log("Data is",response.data)
       console.log("Registration successful")
       setSuccess(true)
    } catch (error) {
        setErrors(error.response.data)
        console.log("error is",error.response.data)
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
                Create an Account
                </h3>
                <form onSubmit={handleRegistraion}>
                    <div className='mb-3'>
                    <input type="text" className="form-control mb-3" placeholder="Enter Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <small>{errors.username && <div className='text-danger'>{errors.username}</div>}</small>
                    </div>

                    <div className='mb-3'>
                    <input type="email" className="form-control mb-3" placeholder="Enter email address" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <small>{errors.email && <div className='text-danger'>{errors.email}</div>}</small>
                    </div>

                     <div className='mb-5'>
                    <input type="password" className="form-control mb-3" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <small>{errors.password && <div className='text-danger'>{errors.password}</div>}</small>
                    </div>
                    {success && <div className='alert alert-success'>Registration successful</div>}
                    
                    {loading ?(
                    <button type="submit" className='btn btn-info d-block mx-auto' disabled>Please Wait!</button>
                    ):(
                    <button type="submit" className='btn btn-info d-block mx-auto'>Register</button>
                    )}
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Register
