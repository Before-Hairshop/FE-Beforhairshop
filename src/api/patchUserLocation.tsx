import { authInstance } from "./api";

const patchUserLocation = async (
  zipCode: any,
  address: any,
  latitude: any,
  longitude: any,
) => {
  try {
    const body = {
      zipCode: zipCode,
      zipAddress: address,
      latitude: latitude,
      longitude: longitude,
    };
    console.log(body);
    const result = await authInstance.patch(
      "/api/v1/members/profiles",
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

export { patchUserLocation };
