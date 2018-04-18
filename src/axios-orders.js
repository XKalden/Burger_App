import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-c005b.firebaseio.com/',
});



export default instance;



