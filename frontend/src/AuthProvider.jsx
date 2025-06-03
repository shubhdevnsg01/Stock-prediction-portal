import React, { createContext } from 'react'
import { useState} from 'react'

const Authcontext=createContext()

const AuthProvider = ({children}) => {
  const[loggedIn,setLoggedIn]=useState(
    !!localStorage.getItem("accessToken")
  )
    return (
   <>
   <Authcontext.Provider value={{loggedIn,setLoggedIn}}>
    {children}
   </Authcontext.Provider>
   </>
  )
}

export default AuthProvider
export {Authcontext}
