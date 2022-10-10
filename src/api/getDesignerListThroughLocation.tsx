import { authInstance } from "./api";

const getDesignerListThroughLocation = async (num: any) => {
  try {
    const result = await authInstance.get(
      "/api/v1/hair_designers/list_by_location",
      {
        params: {
          page_number: num,
        },
      },
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getDesignerListThroughLocation };
