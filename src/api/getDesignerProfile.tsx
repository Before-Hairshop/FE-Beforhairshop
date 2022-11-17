import { authInstance } from "./api";

const getDesignerProfile = async () => {
  try {
    const result = await (await authInstance).get("/api/v1/hair_designers");
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getDesignerProfile };
