import axios from "axios";
import { BASE_URL } from "../../constants/urls";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
    },
});
