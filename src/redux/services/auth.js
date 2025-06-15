import axios from '../lib/axios';

export const loginUser = (data) => axios.post('/auth/login', data);
export const signupUser = (data) => axios.post('/auth/register', data);

