import { authInstance } from "./api";

const patchUserMatchingDeactive = async () => {
  try {
    const result = await authInstance.patch(
      "/api/v1/members/profiles/deactivate_matching",
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { patchUserMatchingDeactive };
