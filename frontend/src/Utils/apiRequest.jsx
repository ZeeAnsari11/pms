import axios from 'axios';

const apiRequest = axios.create({
    baseURL: `https://projex.nexius.ai/api`,
    withCredentials: true,
});


export default apiRequest;
