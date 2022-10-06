import { authInstance } from "./api";

const postUserProfile = async (
  nickname: any,
  hairStatusIndex: any,
  hairTendencyIndex: any,
  wantedStyle: any,
  wantedStyleDescription: any,
  wantedStylingCost: any,
  stylingDate: Date,
  stylingTime: Date,
  phoneNumber: any,
) => {
  try {
    const body = {
      name: nickname,
      hairCondition: hairStatusIndex,
      hairTendency: hairTendencyIndex,
      desiredHairstyleDescription: wantedStyleDescription,
      payableAmount: wantedStylingCost,
      phoneNumber: phoneNumber,
      treatmentDate:
        stylingDate.getFullYear() +
        "-" +
        stylingDate.getMonth() +
        "-" +
        stylingDate.getDate() +
        "T" +
        stylingTime.getHours() +
        ":" +
        stylingTime.getMinutes(),
      desiredHairstyleList: wantedStyle,
    };
    console.log(body);
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
