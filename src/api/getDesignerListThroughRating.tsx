import { authInstance } from "./api";

const getDesignerListThroughRating = async (pageNum: any) => {
  try {
    const result = await (
      await authInstance
    ).get("/api/v1/hair_designers/list_by_rating", {
      params: {
        page: pageNum,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getDesignerListThroughRating };
