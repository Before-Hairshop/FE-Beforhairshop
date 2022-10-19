import { authInstance } from "./api";

const getRecommendation = async (id: any) => {
  try {
    const result = await (
      await authInstance
    ).get("/api/v1/recommend", {
      params: {
        recommend_id: id,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getRecommendation };
