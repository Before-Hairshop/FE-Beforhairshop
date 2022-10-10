import axios from "axios";
import { readData } from "../utils/asyncStorage";

const BASEURL = "http://localhost:8080";
// const BASEURL = "http://10.0.2.2:8080";

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
      Cookie: `SESSION=${readData("@SESSION_ID")}`,
    },
  });
  return instance;
};

export const defaultInstance = axiosApi();
export const authInstance = axiosAuthApi();
