import { authInstance } from "./api";

const postUserProfile = async () => {
  try {
    const body = {
      name: "",
      hairCondition: "",
      hairTendency: "",
      desiredHairstyleDescription: "",
      payableAmount: "",
      zipCode: "",
      zipAddress: "",
      latitude: "",
      longitude: "",
      detailAddress: "",
      phoneNumber: "",
      treatmentDate: "",
      desiredHairstyleList: [],
    };
    const result = await authInstance.post(
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

export { postUserProfile };
