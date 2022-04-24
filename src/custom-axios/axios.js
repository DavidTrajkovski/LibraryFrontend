import axios from "axios";

const instance = axios.create({
    baseURL: 'https://emt-lab2-191027-backend.herokuapp.com/api',
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
})

export default instance;