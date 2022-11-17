import { authInstance } from "./api";

const getReviewList = async (pageNum: any, designerId: any) => {
  try {
    const result = await (
      await authInstance
    ).get("/api/v1/reviews/list", {
      params: {
        page: pageNum,
        hair_designer_id: designerId,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getReviewList };
