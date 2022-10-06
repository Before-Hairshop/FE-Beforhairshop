import { authInstance } from "./api";

const getMemberProfile = async () => {
  try {
    const result = await authInstance.get("/api/v1/members/profiles");
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getMemberProfile };
