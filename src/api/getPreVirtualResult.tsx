import { authInstance } from "./api";

const getPreVirtualResult = async (id: any) => {
  try {
    const result = await (
      await authInstance
    ).get("/api/v1/virtual_hairstyling/inference_result_pre", {
      params: {
        pre_input_image_id: id,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getPreVirtualResult };
