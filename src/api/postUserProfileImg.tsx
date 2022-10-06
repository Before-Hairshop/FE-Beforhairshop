import { authInstance } from "./api";

const postUserProfileImg = async (
  isFrontImg: any,
  isSideImg: any,
  isBackImg: any,
  NumOfdesiredHairImg: any,
) => {
  try {
    const result = await authInstance.post(
      "/api/v1/members/profiles/image",
      null,
      {
        params: {
          front_image_flag: isFrontImg,
          side_image_flag: isSideImg,
          back_image_flag: isBackImg,
          desired_hairstyle_image_count: NumOfdesiredHairImg,
        },
      },
    );
    return result.data.result.preSignedUrl;
  } catch (error) {
    console.log(error);
  }
};

export { postUserProfileImg };
