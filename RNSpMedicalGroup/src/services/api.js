import axios from 'axios';

const api = axios.create({
    baseURL: "https://apispmedgroup.azurewebsites.net/api"
});

export default api;