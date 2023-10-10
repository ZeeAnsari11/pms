import axios from 'axios';

const apiRequest = axios.create({
    baseURL: `https://projex.nexius.ai`,
    withCredentials: true,
});


export default apiRequest;
