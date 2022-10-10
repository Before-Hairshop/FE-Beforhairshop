import { authInstance } from "./api";

const getDesignerProfile = async (id: any) => {
  try {
    const result = await authInstance.get("/api/v1/hair_designers/id", {
      params: {
        hair_designer_id: id,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getDesignerProfile };
