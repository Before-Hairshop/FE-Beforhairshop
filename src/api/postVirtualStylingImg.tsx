import { authInstance } from "./api";
import { putS3Img } from "./putS3Img";

const postVirtualStylingImg = async (blob: any) => {
  try {
    const result = await (
      await authInstance
    ).post("/api/v1/virtual_hairstyling");
    const result2 = await putS3Img(result.data.result.preSignedUrl, blob);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { postVirtualStylingImg };
