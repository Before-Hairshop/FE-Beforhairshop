import { authInstance } from "./api";

const deleteReview = async (id: any) => {
  try {
    const result = await (
      await authInstance
    ).delete("/api/v1/reviews", {
      params: { review_id: id },
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { deleteReview };
