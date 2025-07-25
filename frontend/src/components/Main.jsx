import React, { useContext } from 'react'
import Button from './Button'
import { Authcontext } from '../AuthProvider'



const Main = () => {
  const {loggedIn,setLoggedIn}=useContext(Authcontext)
  return (
   <>
   
    <div className='container'>
      <div className='p-5 text-center bg-light-dark rounded'>
        <h1 className='text-light'>
            Stock Vision
        </h1>
        <p className='text-light lead'>
        StockVision uses cutting-edge Machine Learning algorithms to analyze market trends, historical data, and financial indicators — helping you make smarter, data-driven investment decisions. Whether you're a seasoned trader or a market newcomer, our platform gives you powerful insights into stock price movements with high accuracy.
        </p>
        {loggedIn?(
        <Button text='Dashboard' class='btn-outline-info' url="/Dashboard"/>
      ):(
        <>
         <Button text='Login' class='btn-outline-info' url="/Login"/>
        </>
      )}
      </div>
    </div>
   
   </>
  )
}

export default Main
