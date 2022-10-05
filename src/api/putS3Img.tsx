import { defaultInstance } from "./api";

const putS3Img = async (url, img) => {
  try {
    const result = await defaultInstance.put(url, img);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { putS3Img };
