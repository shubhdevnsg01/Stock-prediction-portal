import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'

const Dashboard = () => {
    const[ticker,setTicker]=useState('');
    const[errors,setError]=useState('');
    const [loading,setLoading]=useState(false)
    const[plot,setPlot]=useState()
    const[ma100,setMA100]=useState()
    const[ma200,setMA200]=useState()
    const[final,setFinal]=useState()
    const[mse,setMse]=useState()
    const[rmse,setRMse]=useState()
    const[r2,setR2]=useState()
    useEffect(()=>{
    const fetchProtectedData = async()=>{
        try{
            const response =await axiosInstance.get('/protected-view/')
            console.log(response.data)
        }catch(error){
            console.log("Error is",error)
        }
    }
    fetchProtectedData();
  },[])

    const handleSubmit= async(e)=>{
        e.preventDefault();
        setLoading(true); 
        try {
            const response= await axiosInstance.post('/predict/',{
                ticker:ticker
            })
            const backendRoot= process.env.BACKEND_ROOT
            const plotURL=`http://127.0.0.1:8000${response.data.plot_image}`
            const ma100URL=`http://127.0.0.1:8000${response.data.plot_100dma_image}`
            const ma200URL=`http://127.0.0.1:8000${response.data.plot_200dma_image}`
            const finalURL=`http://127.0.0.1:8000${response.data.plot_final_image}`

            setMA100(ma100URL)
            setMA200(ma200URL)
            setPlot(plotURL)
            setFinal(finalURL)
            setMse(response.data.mse)
            setRMse(response.data.rmse)
            setR2(response.data.r2)
            if(response.data.error)
            setError("Wrong ticker inserted");
            else
            console.log("predict api is working")
        } catch (error) {
            console.log("Opps there was error",error)
        } finally{
            setLoading(false)
        }
    }
    return (
   <>
    <div className='container'>
        <div className="row" >
            <div className='col md-6 mx-auto'>
                <form onSubmit={handleSubmit}>
                    <input type='text' className='form-control' placeholder='Enter stock ticker' onChange={(e)=>{setTicker(e.target.value)}} required/>
                    <small>{errors && <div className='text-danger'>{errors}</div>}</small>
                {loading?(
                    <button type='submit' className='btn btn-info mt-3'>Please Wait</button>
                ):(
                    <button type='submit' className='btn btn-info mt-3'>Submit</button>
                )}
                </form>
                
            </div>
            {final &&  (
                <>
                <div className='Prediction'>
                <div className='p-5'>
                    {plot && (
                        <img src={plot} alt='Plot' style={{maxWidth:'100%'}}/>
                    )}
                </div>
            </div>
             <div className='ma100'>
                <div className='p-5'>
                    {ma100 && (
                        <img src={ma100} alt='Plot' style={{maxWidth:'100%'}}/>
                    )}
                </div>
            </div>
             <div className='ma200'>
                <div className='p-5'>
                    {ma200 && (
                        <img src={ma200} alt='Plot' style={{maxWidth:'100%'}}/>
                    )}
                </div>
            </div>
             <div className='final'>
                <div className='p-5'>
                    {final && (
                        <img src={final} alt='Plot' style={{maxWidth:'100%'}}/>
                    )}
                </div>
                <div className='text-light p-3'>
                    <h4>Model Evaluation</h4>
                    <p>Mean Squared Error:{mse}</p>
                    <p>Root Mean Squared Error:{rmse}</p>
                    <p>R Squared:{r2}</p>
                </div>
            </div>
                </>
            )}
            {/* <div className='Prediction'>
                <div className='p-5'>
                    {plot && (
                        <img src={plot} alt='Plot' style={{maxWidth:'100%'}}/>
                    )}
                </div>
            </div>
             <div className='ma100'>
                <div className='p-5'>
                    {ma100 && (
                        <img src={ma100} alt='Plot' style={{maxWidth:'100%'}}/>
                    )}
                </div>
            </div>
             <div className='ma200'>
                <div className='p-5'>
                    {ma200 && (
                        <img src={ma200} alt='Plot' style={{maxWidth:'100%'}}/>
                    )}
                </div>
            </div>
             <div className='final'>
                <div className='p-5'>
                    {final && (
                        <img src={final} alt='Plot' style={{maxWidth:'100%'}}/>
                    )}
                </div>
                <div className='text-light p-3'>
                    <h4>Model Evaluation</h4>
                    <p>Mean Squared Error:{mse}</p>
                    <p>Root Mean Squared Error:{rmse}</p>
                    <p>R Squared:{r2}</p>
                </div>
            </div> */}
        </div>
    </div>
   </>

  )
}

export default Dashboard
