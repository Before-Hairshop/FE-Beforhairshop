import { defaultInstance } from "./api";

const postKakaoLogin = async (
  providerId: any,
  email: any,
  accessToken: any,
  deviceToken: any,
) => {
  try {
    const body = {
      providerId: providerId,
      email: email,
      accessToken: accessToken,
      deviceToken: deviceToken,
    };
    console.log(body);
    const result = await defaultInstance.post(
      "/api/v1/oauth/kakao",
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

export { postKakaoLogin };
