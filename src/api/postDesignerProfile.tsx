import { authInstance } from "./api";
import { getGeocoding } from "./getGeocoding";

const postDesignerProfile = async (
  name: any,
  description: any,
  hairTag: any,
  menuInfo: any,
  shopName: any,
  location: any,
  zipCode: any,
  specificLocation: any,
  schedule: any,
  phoneNumber: any,
) => {
  try {
    const { data } = await getGeocoding(location);
    console.log(data);
    const body = {
      name: name,
      description: description,
      hairShopName: shopName,
      zipCode: zipCode,
      zipAddress: location,
      latitude: parseFloat(data.addresses[0].x),
      longitude: parseFloat(data.addresses[0].y),
      detailAddress: specificLocation,
      phoneNumber: phoneNumber,
      hashTagList: hairTag,
      workingDayList: schedule,
      priceList: menuInfo,
    };
    console.log(body);
    const result = await authInstance.post(
      "/api/v1/hair_designers",
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { postDesignerProfile };
