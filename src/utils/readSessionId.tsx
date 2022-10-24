import { readData } from "./asyncStorage";

const readSessionId = async () => {
  readData("@SESSION_ID").then(res => {
    console.log(res);
    return res;
  });
};

export { readSessionId };
