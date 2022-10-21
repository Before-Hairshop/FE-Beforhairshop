import { authInstance } from "./api";

const patchLogout = async () => {
  try {
    const result = await (await authInstance).patch("/api/v1/oauth/logout");
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { patchLogout };
