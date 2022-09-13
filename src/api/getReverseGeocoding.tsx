import axios from "axios";
import Config from "react-native-config";
import { axiosNaverApi } from "./api";

const BASEURL =
  "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc";

const getReverseGeocoding = async (coords: any) => {
  try {
    // const result = await axiosNaverApi(
    //   `${BASEURL}?coords=${coords}&output=json&orders=roadaddr`,
    // ).get();
    const result = await axios.get(
      `${BASEURL}?coords=${coords}&output=json&orders=roadaddr`,
      {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": "",
          // Config.NAVER_MAP_CLIENT_ID,
          "X-NCP-APIGW-API-KEY": "",
          // Config.NAVER_MAP_CLIENT_SECRET,
        },
      },
    );
    console.log(Config.NAVER_MAP_CLIENT_ID);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getReverseGeocoding };
