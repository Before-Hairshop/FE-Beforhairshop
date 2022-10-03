import axios from "axios";
import Config from "react-native-config";

const REQUEST_URL =
  "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode";

const getGeocoding = async (address: string) => {
  try {
    const result = await axios.get(REQUEST_URL, {
      params: {
        query: address,
      },
      headers: {
        "X-NCP-APIGW-API-KEY-ID": Config.NAVER_MAP_CLIENT_ID,
        "X-NCP-APIGW-API-KEY": Config.NAVER_MAP_CLIENT_SECRET,
      },
    });
    if (result.status == 200) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getGeocoding };
