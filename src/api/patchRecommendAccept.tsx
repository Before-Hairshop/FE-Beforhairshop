import { authInstance } from "./api";

const patchRecommendAccept = async (id: any) => {
  try {
    const result = await (
      await authInstance
    ).patch("/api/v1/recommend/response/accept", null, {
      params: { recommend_id: id },
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { patchRecommendAccept };
