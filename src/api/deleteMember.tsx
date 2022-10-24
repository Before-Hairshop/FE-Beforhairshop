import { authInstance } from "./api";

const deleteMember = async () => {
  try {
    const result = await (await authInstance).delete("/api/v1/members");
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { deleteMember };
