import { authInstance } from "./api";

const getVirtualStylingImg = async () => {
  try {
    const result = await (
      await authInstance
    ).get("/api/v1/virtual_hairstyling");
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getVirtualStylingImg };
