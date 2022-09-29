import { authInstance } from "./api";

const postMemberType = async value => {
  try {
    const result = await authInstance.patch(
      "/api/v1/members/validation",
      null,
      {
        params: { hair_designer_flag: value ? 1 : 0 },
      },
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { postMemberType };
