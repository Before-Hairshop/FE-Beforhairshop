import { authInstance } from "./api";

const postDesignerProfileImg = async () => {
  try {
    const result = await (
      await authInstance
    ).post("/api/v1/hair_designers/image");
    return result.data.result.preSignedUrl;
  } catch (error) {
    console.log(error);
  }
};

export { postDesignerProfileImg };
