import { authInstance } from "./api";

const postAIReference = async (id: any) => {
  try {
    const result = await (
      await authInstance
    ).post("/api/v1/virtual_hairstyling/inference", null, {
      params: {
        virtual_member_image_id: id,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { postAIReference };
