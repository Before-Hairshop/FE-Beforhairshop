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

const axiosNaverApi = (url: any) => {
  const instance = axios.create({
    baseURL: url,
    headers: {
      "X-NCP-APIGW-API-KEY-ID": Config.NAVER_MAP_CLIENT_ID,
      "X-NCP-APIGW-API-KEY": Config.NAVER_MAP_CLIENT_SECRET,
    },
  });
  return instance;
};

export const defaultInstance = axiosApi();
export const authInstance = axiosAuthApi();
export { axiosNaverApi };
