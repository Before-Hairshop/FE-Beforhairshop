import { authInstance } from "./api";
import { putS3Img } from "./putS3Img";

const postUserProfileImg = async (profileImg: any, desiredHairImg: any) => {
  try {
    const result = await (
      await authInstance
    ).post("/api/v1/members/profiles/image", null, {
      params: {
        front_image_flag: profileImg[0] == "" ? 0 : 1,
        side_image_flag: profileImg[1] == "" ? 0 : 1,
        back_image_flag: profileImg[2] == "" ? 0 : 1,
        desired_hairstyle_image_count: desiredHairImg.length,
      },
    });
    console.log(result.data);
    if (result.data.result.frontPreSignedUrl != null) {
      putS3Img(result.data.result.frontPreSignedUrl, profileImg[0].blob);
    }
    if (result.data.result.sidePreSignedUrl != null) {
      putS3Img(result.data.result.sidePreSignedUrl, profileImg[1].blob);
    }
    if (result.data.result.backPreSignedUrl != null) {
      putS3Img(result.data.result.backPreSignedUrl, profileImg[2].blob);
    }
    for (
      let i = 0;
      i < result.data.result.desiredStylePreSignedUrl.length;
      i++
    ) {
      putS3Img(
        result.data.result.desiredStylePreSignedUrl[i],
        desiredHairImg[i].blob,
      );
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { postUserProfileImg };
