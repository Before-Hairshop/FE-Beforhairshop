import { authInstance } from "./api";

const getRequestList = async () => {
  try {
    const result = await (
      await authInstance
    ).get("/api/v1/recommend/request/list_by_designer");
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getRequestList };
