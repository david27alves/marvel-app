import axios from 'axios';
import md5 from 'md5';

const ts = Number(new Date())
const apikey = '97fecd81f48b52daa8f7355f0c2c56ea';
const privateKey = '211867274d5fc179e4a93cdee39bdf0db50c0362';
const hash = md5(ts + privateKey + apikey)

const api = axios.create({
    baseURL: `http://gateway.marvel.com/v1/public/`,
    params: {
        ts,
        apikey,
        hash
    }
});

export default api;