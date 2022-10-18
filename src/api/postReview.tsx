import { authInstance } from "./api";

const postReview = async (
  designerId: any,
  starScore: any,
  hairRating: any,
  designerRating: any,
  review: any,
  hairTag: any,
) => {
  try {
    const body = {
      hairDesignerId: designerId,
      totalRating: starScore,
      styleRating: hairRating,
      serviceRating: designerRating,
      content: review,
      hashtagList: hairTag,
    };
    console.log(body);
    const result = await authInstance.post(
      "/api/v1/reviews",
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { postReview };
