import axios from "axios";


const VERCELAPI = "https://ans-apitech.vercel.app";

const LOCALHOST = "http://192.168.1.65:3001";
const TESTEROUTE = "http://localhost:3001";

const api = axios.create({
    baseURL: VERCELAPI,
});

export default api;