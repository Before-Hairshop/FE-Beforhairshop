import { authInstance } from "./api";

const patchUserMatchingActive = async () => {
  try {
    const result = await (
      await authInstance
    ).patch("/api/v1/members/profiles/activate_matching");
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { patchUserMatchingActive };
