import { authInstance } from "./api";
import { putS3Img } from "./putS3Img";

const patchReviewImg = async (reviewId, hairImage, oldImg) => {
  try {
    const A = oldImg.map(item => {
      return item.uri;
    });
    const B = hairImage.map(item => {
      return item.uri;
    });
    console.log(A.filter(n => !B.includes(n)));
    // console.log(B.filter(n => !A.includes(n)));
    const newArr = hairImage.filter(item => item.blob != undefined);
    console.log(newArr);
    const body = {
      reviewId: reviewId,
      addReviewImageCount: newArr.length,
      deleteImageUrlList: A.filter(n => !B.includes(n)),
    };
    // const formData = new FormData();
    // A.filter(n => !B.includes(n)).map((item, index) =>
    //   formData.append("deleteImageUrlList", item),
    // );
    // console.log(formData);
    const result = await (
      await authInstance
    ).patch("/api/v1/reviews/image", JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
      },
      // params: {
      //   review_id: reviewId,
      //   add_review_image_count: newArr.length,
      // },
    });
    for (let i = 0; i < result.data.result.length; i++) {
      putS3Img(result.data.result[i], newArr[i].blob);
    }
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { patchReviewImg };
