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
      price: parseInt(price),
    };
    console.log(body);
    const result = await (
      await authInstance
    ).post("/api/v1/recommend", JSON.stringify(body), {
      params: {
        member_profile_id: id,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { postRecommendation };
