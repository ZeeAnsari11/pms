import axios from 'axios';

const apiRequest = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}`,
    withCredentials: true,
});


export default apiRequest;
