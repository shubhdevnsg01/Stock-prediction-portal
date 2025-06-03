import axios from "axios";

const axiosInstance=axios.create({
    baseURL:'http://127.0.0.1:8000/api',
    headers:{
        "Content-Type":"application/json"
    }
})
//request interceptor
axiosInstance.interceptors.request.use(
    function(config){
        const accessToken=localStorage.getItem('accessToken')
        if(accessToken){
            config.headers['Authorization']=`Bearer ${accessToken}`
        }
        return config
    },function(error){
        return Promise.reject(error)
    }
)
//response interceptor

 axiosInstance.interceptors.response.use(
     function(response){
        return response
    },async function(error){
        const originalRequest=error.config;
        const refreshToken=localStorage.getItem('refreshToken')
        if(error.response.status===401 &&!originalRequest.retry)
        {
            originalRequest.retry=true
            try{
                const response= await axiosInstance.post('/token/refresh/',{refresh:refreshToken})
                console.log("the axios interceptor data is:- ",response.data)
                localStorage.setItem('accessToken',response.data.access)
                originalRequest.headers['Authorization']=`Bearer ${response.data.access}`
                return axiosInstance(originalRequest)
            }catch(error){
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
               
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance