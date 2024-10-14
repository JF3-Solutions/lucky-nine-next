import axios, {type AxiosInstance} from "axios";

const apiAdapter:() => AxiosInstance = ():AxiosInstance => {
    return axios.create({
        baseURL: process.env.API_URL||'http://localhost:3000',
        timeout: 10000,
    });
};
export default apiAdapter