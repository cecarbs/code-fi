import axios from 'axios';

const instance = axios.create({
    // await axios.get('/code-fi/songs')
    baseURL: "http://localhost:8001",
});

export default instance; 