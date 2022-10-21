import { authInstance } from "./api";

const patchReview = async (
  reviewId: any,
  starScore: any,
  hairRating: any,
  designerRating: any,
  review: any,
  hairTag: any,
) => {
  try {
    const body = {
      totalRating: starScore,
      styleRating: hairRating,
      serviceRating: designerRating,
      content: review,
      hashtagList: hairTag,
    };
    console.log(body);
    const result = await (
      await authInstance
    ).patch("/api/v1/reviews", JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        review_id: reviewId,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { patchReview };
