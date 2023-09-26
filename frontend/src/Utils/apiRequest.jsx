import axios from 'axios';

const apiRequest = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
});

console.log('API base URL is', process.env.REACT_APP_API_URL);
export default apiRequest;
