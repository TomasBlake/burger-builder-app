import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-be55e.firebaseio.com/'
});

export default instance;