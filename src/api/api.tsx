import axios from "axios";
import { readData } from "../utils/asyncStorage";
import { BASEURL } from "./baseUrl";

const axiosApi = () => {
  const instance = axios.create({
    baseURL: BASEURL,
  });
  return instance;
};

const axiosAuthApi = async () => {
  console.log(await readData("@SESSION_ID"));
  const instance = axios.create({
    baseURL: BASEURL,
    headers: {
      Cookies: `SESSION=${await readData("@SESSION_ID")}`,
    },
  });
  return instance;
};

export const defaultInstance = axiosApi();
export const authInstance = axiosAuthApi();
