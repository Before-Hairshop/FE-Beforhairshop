import { authInstance } from "./api";

const getMemberSession = async () => {
  try {
    const result = await (await authInstance).get("/api/v1/members/session");
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getMemberSession };
