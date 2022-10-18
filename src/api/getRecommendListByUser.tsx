import { authInstance } from "./api";

const getRecommendListByUser = async () => {
  try {
    const result = await (
      await authInstance
    ).get("/api/v1/recommend/list_by_location");
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getRecommendListByUser };
