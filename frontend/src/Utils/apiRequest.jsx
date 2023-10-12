import axios from 'axios';
import {REACT_APP_HOST} from "./envConstants";

const apiRequest = axios.create({
    baseURL: REACT_APP_HOST,
    withCredentials: true,
});


export default apiRequest;
