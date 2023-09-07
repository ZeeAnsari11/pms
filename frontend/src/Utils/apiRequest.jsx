import axios from 'axios';

const apiRequest = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}`,
});

console.log('API base URL is', process.env.REACT_APP_HOST);
export default apiRequest;
