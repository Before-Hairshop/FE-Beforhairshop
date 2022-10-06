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
      desiredHairstyle: wantedStyle,
      desiredHairstyleDescription: wantedStyleDescription,
      payableAmount: wantedStylingCost,
      phoneNumber: phoneNumber,
      treatmentDate:
        stylingDate.getFullYear() +
        "-" +
        ("0" + stylingDate.getMonth()).slice(-2) +
        "-" +
        ("0" + stylingDate.getDate()).slice(-2) +
        "T" +
        ("0" + stylingTime.getHours()).slice(-2) +
        ":" +
        ("0" + stylingTime.getMinutes()).slice(-2),
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
