import { authInstance } from "./api";

const getUserProfileById = async id => {
  try {
    const result = await (
      await authInstance
    ).get("/api/v1/members/profiles/detail", {
      params: {
        member_profile_id: id,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getUserProfileById };
