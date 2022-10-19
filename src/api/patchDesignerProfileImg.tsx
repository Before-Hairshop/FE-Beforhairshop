import { authInstance } from "./api";
import { putS3Img } from "./putS3Img";

const patchDesignerProfileImg = async (blob: any) => {
  try {
    const result = await (
      await authInstance
    ).patch("/api/v1/hair_designers/image");
    console.log(result.data.result.preSignedUrl);
    console.log(blob);
    const result2 = await putS3Img(result.data.result.preSignedUrl, blob);
    return result2;
  } catch (error) {
    console.log(error);
  }
};

export { patchDesignerProfileImg };
