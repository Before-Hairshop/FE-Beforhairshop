import { authInstance } from "./api";
import { putS3Img } from "./putS3Img";

const postRecommendationImg = async (
  recommendId: any,
  recommendationImg: any,
) => {
  try {
    const result = await (
      await authInstance
    ).post("/api/v1/recommend/image", null, {
      params: {
        recommend_id: recommendId,
        image_count: recommendationImg.length,
      },
    });
    result.data.result.map((url, index) => {
      putS3Img(url, recommendationImg[index].blob);
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { postRecommendationImg };
