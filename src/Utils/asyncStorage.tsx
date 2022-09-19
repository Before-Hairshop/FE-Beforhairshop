import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem("@SESSION_ID", value);
  } catch (error) {
    console.log(error);
  }
};

const readData = async () => {
  try {
    const value = await AsyncStorage.getItem("@SESSION_ID");
    return value;
  } catch (error) {
    console.log(error);
  }
};

export { storeData, readData };
