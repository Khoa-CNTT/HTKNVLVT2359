import axios from 'axios';
const url = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"


const instance = axios.create({
    baseURL: url,
    //  withCredentials: true
});

if(localStorage.getItem("token_user")){
    instance.interceptors.request.use(
        config =>{
            config.headers.authorization = "Bearer " +localStorage.getItem("token_user")
            return config
        },
        error =>{
            return Promise.reject(error)
        }
    );
}

instance.interceptors.response.use(
    (response) => {
        // Thrown error for request with OK status code
        const { data } = response;
        return response.data
    }
);

export default instance;