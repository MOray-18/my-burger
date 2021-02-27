import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-8d1f8-default-rtdb.firebaseio.com/',
});

export default instance;
