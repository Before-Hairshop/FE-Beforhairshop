import axios from "axios";
import { readData } from "../utils/asyncStorage";

const BASEURL = "http://localhost:8080";

const axiosApi = () => {
  const instance = axios.create({
    baseURL: BASEURL,
  });
  return instance;
};

const axiosAuthApi = () => {
  const instance = axios.create({
    baseURL: BASEURL,
    headers: {
      Cookies: `JSESSIONID=${readData()}`,
    },
  });
  return instance;
};

export const defaultInstance = axiosApi();
export const authInstance = axiosAuthApi();
