import { authInstance } from "./api";

const postRequest = async (id: any) => {
  try {
    const body = {
      hairDesignerProfileId: id,
    };
    console.log(body);
    const result = await (
      await authInstance
    ).post("/api/v1/recommend/request", JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { postRequest };
