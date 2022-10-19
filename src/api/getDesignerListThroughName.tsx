import { authInstance } from "./api";

const getDesignerListThroughName = async (name: any, pageNum: any) => {
  try {
    const result = await (
      await authInstance
    ).get("/api/v1/hair_designers/list_by_name", {
      params: {
        name: name,
        page: pageNum,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getDesignerListThroughName };
