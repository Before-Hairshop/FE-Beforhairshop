import { authInstance } from "./api";

const getUserProfile = async () => {
  try {
    const result = await (await authInstance).get("/api/v1/members/profiles");
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getUserProfile };
