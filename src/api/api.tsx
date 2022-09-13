import axios from "axios";
import Config from "react-native-config";

const BASEURL = "http://localhost:8080";

const axiosApi = () => {
  const instance = axios.create({
    baseURL: BASEURL,
  });
  return instance;
};

const axiosAuthApi = () => {
  const token = "token";
  const instance = axios.create({
    baseURL: BASEURL,
    headers: {
      Authorization: "Bearer" + token,
    },
  });
  return instance;
};

export const defaultInstance = axiosApi();
export const authInstance = axiosAuthApi();
