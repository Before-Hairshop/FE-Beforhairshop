import { authInstance } from "./api";

const getMemberInfo = async () => {
  try {
    const result = await authInstance.get("/api/v1/members");
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getMemberInfo };
