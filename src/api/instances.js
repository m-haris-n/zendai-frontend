import axios from "axios";

const BASE_URL = import.meta.env["VITE_BASE_URL"];

const pubIns = axios.create({ baseURL: BASE_URL });

const privIns = axios.create({ baseURL: BASE_URL });

privIns.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem("token");
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (err) => Promise.reject(err)
);

privIns.interceptors.response.use(
   (response) => {
      return response;
   },
   (error) => {
      if (error.response.status == 401) {
         localStorage.clear();
      }
      Promise.reject(error);
   }
);

export { privIns, pubIns };
