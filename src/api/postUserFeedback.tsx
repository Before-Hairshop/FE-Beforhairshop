import { authInstance } from "./api";

const postUserFeedback = async (id: any, contents: any) => {
  try {
    const result = await (
      await authInstance
    ).post("/api/v1/members/user_feedback", JSON.stringify(contents), {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        member_id: id,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { postUserFeedback };
