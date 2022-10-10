import { authInstance } from "./api";

const getRecommendList = async (pageNum: any) => {
  try {
    const result = await authInstance.get(
      "/api/v1/recommend/list_by_location",
      {
        params: {
          page_number: pageNum,
        },
      },
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getRecommendList };
