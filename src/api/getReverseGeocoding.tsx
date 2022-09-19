import axios from "axios";
import Config from "react-native-config";

const REQUEST_URL =
  "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc";

const getReverseGeocoding = async (coords: any) => {
  try {
    const result = await axios.get(REQUEST_URL, {
      params: {
        coords: coords,
        output: "json",
        orders: "roadaddr",
      },
      headers: {
        "X-NCP-APIGW-API-KEY-ID": Config.NAVER_MAP_CLIENT_ID,
        "X-NCP-APIGW-API-KEY": Config.NAVER_MAP_CLIENT_SECRET,
      },
    });
    if (result.status == 200) {
      console.log(result.data);
      return result.data;
    }
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getReverseGeocoding };
