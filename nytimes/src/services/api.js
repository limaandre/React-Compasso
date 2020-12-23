import axios from 'axios';
import API from '../environments/environments';

const api = axios.create({
    baseURL: 'https://api.nytimes.com/svc/topstories/v2',
    params: {'api-key': API.KEY}
});

export default api;