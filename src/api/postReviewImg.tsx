import { authInstance } from "./api";
import { putS3Img } from "./putS3Img";

const postReviewImg = async (id: any, hairImage: any) => {
  try {
    const result = await authInstance.post("/api/v1/reviews/image", null, {
      params: {
        review_id: id,
        review_image_count: hairImage.length,
      },
    });
    for (let i = 0; i < result.data.result.length; i++) {
      putS3Img(result.data.result[i], hairImage[i].blob);
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { postReviewImg };
