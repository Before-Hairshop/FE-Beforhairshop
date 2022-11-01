import { authInstance } from "./api";

const deleteRecommend = async (id: any) => {
  try {
    const result = await (
      await authInstance
    ).delete("/api/v1/recommend", {
      params: { recommend_id: id },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { deleteRecommend };
