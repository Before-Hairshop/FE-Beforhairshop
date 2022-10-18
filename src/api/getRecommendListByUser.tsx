import { authInstance } from "./api";

const getRecommendListByUser = async () => {
  try {
    const result = await (
      await authInstance
    ).get("/api/v1/recommend/list_by_user");
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getRecommendListByUser };
