import { authInstance } from "./api";

const getDesignerProfileById = async id => {
  try {
    const result = await (
      await authInstance
    ).get("/api/v1/hair_designers/id/", {
      params: {
        hair_designer_id: id,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getDesignerProfileById };
