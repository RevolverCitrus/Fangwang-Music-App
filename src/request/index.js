import axios from 'axios';
const service=axios.create({
    baseURL:'http://localhost:3000',
    timeout:3000,
    withCredentials: true
})

// 响应拦截
// service.interceptors.response.use((response)=>{
//     let res =response.data;
//     if(res.code !==200){
//         return Promise.reject(res.data);
//     }else{
//         return res;
//     }
// },
//     (error)=>Promise.reject(error)
// )



export default service