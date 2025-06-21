import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "https://localhost:8081/api/v1" : "/api/v1",
    withCredentials: true,
});