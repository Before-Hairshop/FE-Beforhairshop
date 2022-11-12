import { authInstance } from "./api";

const getVirtualResult = async (id: any) => {
  try {
    const result = await (
      await authInstance
    ).get("/api/v1/virtual_hairstyling/inference_result", {
      params: {
        virtual_member_image_id: id,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getVirtualResult };
