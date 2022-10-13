import { authInstance } from "./api";

const postRecommendation = async (
  id: any,
  greeting: any,
  hairstyleName: any,
  reason: any,
  price: any,
  treatmentDate: any,
) => {
  try {
    const body = {
      greeting: greeting,
      treatmentDate: treatmentDate,
      hairstyle: hairstyleName,
      reason: reason,
      price: price,
    };
    console.log(body);
    const result = await authInstance.post(
      "/api/v1/recommend",
      JSON.stringify(body),
      {
        params: {
          member_profile_id: id,
        },
      },
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { postRecommendation };
