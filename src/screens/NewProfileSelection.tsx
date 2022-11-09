import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/themed";
import { scale, verticalScale } from "../utils/scale";
import ProfileImage from "../components/profileSelection/ProfileImage";
import { useNavigation } from "@react-navigation/native";
import HighlightText from "react-native-highlight-underline-text";
import uuid from "react-native-uuid";
import { setSelectedImage } from "../store/actions/profile_actions";
import { useDispatch, useStore } from "react-redux";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Modal from "react-native-modal";
import ComplexityHeader from "../components/common/ComplexityHeader";

const BASE = "base";
const EDIT = "edit";
const SELECTED = "selected";
const ADD = "add";

const placeholderUrl =
  "https://user-images.githubusercontent.com/55876368/199949845-66656d25-1c84-4445-8cc1-4ce13ff14ce3.png";
// "https://user-images.githubusercontent.com/55876368/199634630-db396173-517d-4e9a-939a-53f5cdb23228.png";
// "https://via.placeholder.com/300.png/09f/fffC/O%20https://placeholder.com/";

const addedPlaceholderUrl =
  "https://via.placeholder.com/150/0000FF/808080%20?Text=Digital.com";

export default function NewProfileSelection(props) {
  const dispatch = useDispatch();
  const store = useStore();
  const navigation = useNavigation();

  let [imageInfo, setImageInfo] = useState([
    {
      id: "bd7acbeafasd3abb28ba",
      uri: placeholderUrl,
      title: "1 Item",
      status: BASE,
    },
    {
      id: "3ac68afc-c605-48d3-aafsdfasdf4f8-fbd91aa97f63",
      uri: placeholderUrl,
      title: "2 Item",
      status: BASE,
    },
    {
      id: "58694a0f-3da1-471f-asdfasdfbd96-145571e29d72",
      uri: placeholderUrl,
      title: "3 Item",
      status: BASE,
    },
    {
      id: "58694a0f-3da1-471f-bd9sadfadsf6-145571e29d72",
      uri: placeholderUrl,
      title: "4 Item",
      status: BASE,
    },
    {
      id: "58694a0ffasdfdasf71f-bd96-145571e29d72",
      uri: placeholderUrl,
      title: "5 Item",
      status: BASE,
    },
    {
      id: "58694a0f-3daasdfas1-471f-bd9sd6-145571e29d72",
      uri: placeholderUrl,
      title: "6 Item",
      status: BASE,
    },
    {
      id: "58694a0f-3daasdfsdfasdas1-471f-bd9sd6-145571e29d72",
      uri: placeholderUrl,
      title: "7 Ifsdaftem",
      status: BASE,
    },
    {
      id: "58694a0f-3daasadfsadffsdfasdas1-471f-bd9sd6-145571e29d72",
      uri: placeholderUrl,
      title: "8 Ifsdaftem",
      status: ADD,
    },
  ]);

  let [selectedImageId, setSelectedImageId] = useState("");
  let [screenStatus, setScreenStatus] = useState(BASE);
  let [isModalVisible, setIsModalVisible] = useState(false);

  const startEdit = () => {
    setScreenStatus(EDIT);
    let newArray = [...imageInfo];

    let arrayLength = newArray.length;
    for (let i = 0; i < arrayLength; i++) {
      if (newArray[i].status != ADD) {
        newArray[i].status = EDIT;
      }
    }

    setImageInfo(newArray);
  };

  const finishEdit = () => {
    setScreenStatus(BASE);
    let newArray = [...imageInfo];

    let arrayLength = newArray.length;
    for (let i = 0; i < arrayLength; i++) {
      if (newArray[i].status != ADD) {
        newArray[i].status = BASE;
      }
    }

    setImageInfo(newArray);
  };

  const deleteSelectedImage = () => {
    let newArray = [...imageInfo];
    newArray = newArray.filter(item => item.id != selectedImageId);
    setImageInfo(newArray);
    setIsModalVisible(false);
  };

  const handleSelection = async (id, status) => {
    if (status == ADD) {
      try {
        const result = await launchImageLibrary({}, response => {
          let uri = addedPlaceholderUrl;
          let newImage = {
            id: uuid.v4(),
            uri: uri,
            status: BASE,
          };

          let newArray = [...imageInfo];
          let toInsertIndex = newArray.length - 1;
          newArray.splice(toInsertIndex, 0, newImage);

          setImageInfo(newArray);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedImageId(id);
      if (screenStatus == EDIT) {
        setIsModalVisible(true);
      } else {
        imageInfo.forEach((item, index) => {
          if (item.status == ADD) {
          } else if (item.id != id) {
            //reset image selection
            imageInfo[index].status = BASE;
          } else if (
            item.id == id &&
            item.id != store.getState().Profile.selectedImage
          ) {
            //when user choose new image
            console.log(item);
            let newArray = [...imageInfo];
            newArray[index].status = SELECTED;
            setImageInfo(newArray);

            setScreenStatus(SELECTED);
            dispatch(setSelectedImage(item));
          } else {
            console.log(item);
            //when user choose already selected image
            let newArray = [...imageInfo];
            imageInfo[index].status = BASE;
            setImageInfo(newArray);

            setScreenStatus(BASE);

            dispatch(setSelectedImage(item));
          }
        });
      }
    }
  };
  const HeaderButton = () => {
    if (screenStatus == SELECTED) {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NewVirtualStyling");
          }}>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: scale(16),
              fontWeight: "500",
              fontStyle: "normal",
              letterSpacing: -0.5,
              textAlign: "left",
              color: "#fc2a5b",
            }}>
            다음
          </Text>
        </TouchableOpacity>
        // <Button
        //   title="다음"
        //   type="clear"
        //   titleStyle={styles.headerRightButton}
        //   onPress={() => navigation.navigate("VirtualStyling")}
        // />
      );
    } else if (screenStatus == BASE) {
      return (
        <TouchableOpacity
          onPress={() => {
            startEdit();
          }}>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: scale(16),
              fontWeight: "500",
              fontStyle: "normal",
              letterSpacing: -0.5,
              textAlign: "left",
              color: "#fc2a5b",
            }}>
            편집
          </Text>
        </TouchableOpacity>
        // <Button
        //   title="편집"
        //   type="clear"
        //   titleStyle={styles.headerRightButton}
        //   onPress={startEdit}
        // />
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            finishEdit();
          }}>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: scale(16),
              fontWeight: "500",
              fontStyle: "normal",
              letterSpacing: -0.5,
              textAlign: "left",
              color: "#fc2a5b",
            }}>
            완료
          </Text>
        </TouchableOpacity>
        // <Button
        //   title="완료"
        //   type="clear"
        //   titleStyle={styles.headerRightButton}
        //   onPress={finishEdit}
        // />
      );
    }
  };

  const renderItem = ({ item }) => {
    return (
      <ProfileImage
        thumbnail={item.uri}
        status={item.status}
        id={item.id}
        onPressImage={() => handleSelection(item.id, item.status)}
      />
    );
  };
  return (
    <SafeAreaView style={styles.frame}>
      <Modal isVisible={isModalVisible}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View
            style={{
              width: scale(330),
              height: verticalScale(130),
              borderRadius: 10,
              backgroundColor: "#fff",
              borderColor: "#fff",
            }}>
            <View style={{ height: "65%", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  color: "#000",
                  fontSize: verticalScale(20),
                  marginTop: verticalScale(33),
                }}>
                이 프로필을 삭제하시겠어요?
              </Text>
            </View>
            <View style={{ height: "35%", flexDirection: "row" }}>
              <View style={{ width: "50%", justifyContent: "center" }}>
                <Button
                  title="취소"
                  type="clear"
                  titleStyle={[styles.headerRightButton, { color: "black" }]}
                  onPress={() => setIsModalVisible(false)}
                />
              </View>
              <View style={{ width: "50%", justifyContent: "center" }}>
                <Button
                  title="삭제"
                  type="clear"
                  titleStyle={styles.headerRightButton}
                  onPress={deleteSelectedImage}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        ListHeaderComponent={
          <>
            <ComplexityHeader
              title=""
              goBack="Main"
              button={<HeaderButton />}
            />
            <View style={{ alignItems: "center" }}>
              <View style={{ width: "88.9%" }}>
                <View style={{ paddingBottom: verticalScale(30) }}>
                  <Text
                    style={{
                      fontFamily: "Pretendard",
                      fontSize: verticalScale(22),
                      color: "white",
                      marginBottom: verticalScale(5),
                    }}>
                    가상 헤어를 적용할
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <HighlightText
                      isFixed={false}
                      ratio={0.26}
                      underlineColor="rgba(252, 42, 91, 0.5)"
                      textStyle={{
                        fontFamily: "Pretendard",
                        fontSize: verticalScale(22),
                        fontWeight: "bold",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        textAlign: "left",
                        color: "#ffffff",
                      }}
                      text="프로필을 선택"
                    />
                    <Text>
                      <Text
                        style={{
                          fontFamily: "Pretendard-Regular",
                          fontSize: verticalScale(22),
                          color: "white",
                        }}>
                        해주세요
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </>
        }
        data={imageInfo}
        extraData={Object.values(imageInfo)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginHorizontal: verticalScale(20),
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: "#191919",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  headerRightButton: {
    fontFamily: "Pretendard-Bold",
    fontSize: verticalScale(16),
    color: "#fc2a5b",
  },
});
