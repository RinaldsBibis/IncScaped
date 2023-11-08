import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
})

axiosClient.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`;
    return config;
});

axios.interceptors.request.use(response =>{
    return response;
},error => {
    if(error.response && error.response.status === 401){
        console.log(error);
        return error;
    }
    throw error;
})

export default axiosClient;