import ImageResizer from "@bam.tech/react-native-image-resizer";

const resizeImage = async (uri: any) => {
  try {
    const value = await ImageResizer.createResizedImage(
      uri, // path
      1024, // width
      1024, // height
      "JPEG", // format
      100, // quality -> 100 넘기면 android error
      // undefined,
      // undefined,
      // undefined,
      // { mode: "cover", onlyScaleDown: true },
    );
    return value;
  } catch (error) {
    console.log(error);
  }
};

export { resizeImage };
