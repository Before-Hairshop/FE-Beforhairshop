import { authInstance } from "./api";
import { putS3Img } from "./putS3Img";

const patchUserProfileImg = async (
  profileImage: any,
  wantHairImage: any,
  oldImg: any,
) => {
  try {
    const A = oldImg.map(item => {
      return item.uri;
    });
    const B = wantHairImage.map(item => {
      return item.uri;
    });
    console.log(A.filter(n => !B.includes(n)));
    // console.log(B.filter(n => !A.includes(n)));
    const newArr = wantHairImage.filter(item => item.blob != undefined);
    console.log(newArr);
    const body = {
      frontImageFlag: profileImage[0].blob == undefined ? 0 : 1,
      sideImageFlag: profileImage[1].blob == undefined ? 0 : 1,
      backImageFlag: profileImage[2].blob == undefined ? 0 : 1,
      addDesiredHairstyleImageCount: newArr.length,
      deleteDesiredImageUrlList: A.filter(n => !B.includes(n)),
    };
    // const formData = new FormData();
    // A.filter(n => !B.includes(n)).map((item, index) =>
    //   formData.append("deleteDesiredImageUrlList", item),
    // );
    // console.log(formData);
    const result = await (
      await authInstance
    ).patch("/api/v1/members/profiles/image", JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
      },
      // params: {
      //   front_image_flag: profileImage[0].blob == undefined ? 0 : 1,
      //   side_image_flag: profileImage[1].blob == undefined ? 0 : 1,
      //   back_image_flag: profileImage[2].blob == undefined ? 0 : 1,
      //   add_desired_hairstyle_image_count: newArr.length,
      // },
    });
    if (result.data.result.frontPreSignedUrl != null) {
      putS3Img(result.data.result.frontPreSignedUrl, profileImage[0].blob);
    }
    if (result.data.result.sidePreSignedUrl != null) {
      putS3Img(result.data.result.sidePreSignedUrl, profileImage[1].blob);
    }
    if (result.data.result.backPreSignedUrl != null) {
      putS3Img(result.data.result.backPreSignedUrl, profileImage[2].blob);
    }
    for (
      let i = 0;
      i < result.data.result.desiredStylePreSignedUrl.length;
      i++
    ) {
      putS3Img(result.data.result.desiredStylePreSignedUrl[i], newArr[i].blob);
    }
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { patchUserProfileImg };
