const putS3Img = async (url, img) => {
  try {
    const result = await fetch(
      new Request(url, {
        method: "PUT",
        body: img,
      }),
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { putS3Img };
