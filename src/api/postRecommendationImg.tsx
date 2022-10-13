import { authInstance } from "./api";

const postRecommendationImg = async () => {
  try {
    const result = await authInstance.post("/api/v1/recommend/image", null, {
      params: {
        recommend_id: "",
        image_count: "",
      },
    });
    return result.data.result.preSignedUrl;
  } catch (error) {
    console.log(error);
  }
};

export { postRecommendationImg };
