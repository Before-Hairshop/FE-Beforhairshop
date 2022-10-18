import { authInstance } from "./api";

const getRecommendListByDesigner = async () => {
  try {
    const result = await (
      await authInstance
    ).get("/api/v1/recommend/list_by_designer");
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getRecommendListByDesigner };
