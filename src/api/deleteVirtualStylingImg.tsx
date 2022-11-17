import { authInstance } from "./api";

const deleteVirtualStylingImg = async (url: string) => {
  try {
    const result = await (
      await authInstance
    ).delete("/api/v1/virtual_hairstyling", {
      params: { virtual_member_image_url: url },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { deleteVirtualStylingImg };
