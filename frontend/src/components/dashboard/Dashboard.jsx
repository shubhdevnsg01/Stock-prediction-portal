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
    const [showPlot, setShowPlot] = useState(false);
    const [showMA100, setShowMA100] = useState(false);
    const [showMA200, setShowMA200] = useState(false);
    const [showFinal, setShowFinal] = useState(false);
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
             <div>
      
      {final && (
        <>
          {/* Toggle Buttons Side by Side */}
          <div>
            <div className="toggle-buttons">
            <button onClick={() => setShowPlot(!showPlot)} className="btn btn-primary">
              Main Prediction Plot
            </button>
            <button onClick={() => setShowMA100(!showMA100)} className="btn btn-primary">
              MA100 Plot
            </button>
            <button onClick={() => setShowMA200(!showMA200)} className="btn btn-warning">
              MA200 Plot
            </button>
            <button onClick={() => setShowFinal(!showFinal)} className="btn btn-success">
              Final Results
            </button>
          </div>
          </div>

          {/* Collapsible Sections */}
          {showPlot && plot && (
            <div className="Prediction p-3">
              <img src={plot} alt="Plot" style={{ maxWidth: '100%' }} />
            </div>
          )}

          {showMA100 && ma100 && (
            <div className="ma100 p-3">
              <img src={ma100} alt="MA100 Plot" style={{ maxWidth: '100%' }} />
            </div>
          )}

          {showMA200 && ma200 && (
            <div className="ma200 p-3">
              <img src={ma200} alt="MA200 Plot" style={{ maxWidth: '100%' }} />
            </div>
          )}

          {showFinal && final && (
            <div className="final p-3">
              <img src={final} alt="Final Plot" style={{ maxWidth: '100%' }} />
              <div className="text-light p-3 bg-dark mt-2 rounded">
                <h4>Model Evaluation</h4>
                <p>Mean Squared Error: {mse}</p>
                <p>Root Mean Squared Error: {rmse}</p>
                <p>R Squared: {r2}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
        </div>
    </div>
   </>

  )
}

export default Dashboard
