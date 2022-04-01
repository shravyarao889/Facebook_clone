import axios from 'axios'
export const adapter = axios.create({
    baseURL: `http://localhost:5000/api/v1/`,
    headers: {
        Authorization:`Bearer ${localStorage.getItem('AccessToken')}`,
        Accept: 'application/json;charset=UTF-8',
    },
});
