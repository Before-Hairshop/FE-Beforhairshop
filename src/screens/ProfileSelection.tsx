import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

import React, { useState, useEffect } from "react";
import { Avatar } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { scale, verticalScale } from "../utils/scale";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileImage from "../components/profileSelection/ProfileImage";
import { useNavigation } from "@react-navigation/native";
import HighlightText from "react-native-highlight-underline-text";

import uuid from "react-native-uuid";

import { setSelectedImage } from "../store/actions/profile_actions";
import { useDispatch, useStore } from "react-redux";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import Modal from "react-native-modal";

const BASE = "base";
const EDIT = "edit";
const SELECTED = "selected";
const ADD = "add";

const placeholderUrl =
  "https://via.placeholder.com/300.png/09f/fffC/O%20https://placeholder.com/";

const addedPlaceholderUrl =
  "https://via.placeholder.com/150/0000FF/808080%20?Text=Digital.com";
export default function ProfileSelection(props) {
  const dispatch = useDispatch();
  const store = useStore();
  const navigation = useNavigation();

  let [imageInfo, setImageInfo] = useState([
    {
      id: "bd7acbeafasd3abb28ba",
      // uri: require("../assets/images/popular_thumbnail.jpeg"),
      uri: placeholderUrl,
      title: "1 Item",
      status: BASE,
    },
    {
      id: "3ac68afc-c605-48d3-aafsdfasdf4f8-fbd91aa97f63",
      // uri: require("../assets/images/popular_thumbnail.jpeg"),
      uri: placeholderUrl,
      title: "2 Item",
      status: BASE,
    },
    {
      id: "58694a0f-3da1-471f-asdfasdfbd96-145571e29d72",
      // uri: require("../assets/images/popular_thumbnail.jpeg"),
      uri: placeholderUrl,
      title: "3 Item",
      status: BASE,
    },
    {
      id: "58694a0f-3da1-471f-bd9sadfadsf6-145571e29d72",
      // uri: require("../assets/images/popular_thumbnail.jpeg"),
      uri: placeholderUrl,
      title: "4 Item",
      status: BASE,
    },
    {
      id: "58694a0ffasdfdasf71f-bd96-145571e29d72",
      // uri: require("../assets/images/popular_thumbnail1.png"),
      uri: placeholderUrl,
      title: "5 Item",
      status: BASE,
    },
    {
      id: "58694a0f-3daasdfas1-471f-bd9sd6-145571e29d72",
      // uri: require("../assets/images/popular_thumbnail.jpeg"),
      uri: placeholderUrl,
      title: "6 Item",
      status: BASE,
    },
    {
      id: "58694a0f-3daasdfsdfasdas1-471f-bd9sd6-145571e29d72",
      // uri: require("../assets/images/popular_thumbnail.jpeg"),
      uri: placeholderUrl,
      title: "7 Ifsdaftem",
      status: BASE,
    },
    {
      id: "58694a0f-3daasadfsadffsdfasdas1-471f-bd9sd6-145571e29d72",
      // uri: require("../assets/images/popular_thumbnail.jpeg"),
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
        <Button
          title="다음"
          type="clear"
          titleStyle={styles.headerRightButton}
          onPress={() => navigation.navigate("VirtualStyling")}
        />
      );
    } else if (screenStatus == BASE) {
      return (
        <Button
          title="편집"
          type="clear"
          titleStyle={styles.headerRightButton}
          onPress={startEdit}
        />
      );
    } else {
      return (
        <Button
          title="완료"
          type="clear"
          titleStyle={styles.headerRightButton}
          onPress={finishEdit}
        />
      );
    }
  };

  const HeaderContents = () => {
    const navigation = useNavigation();

    return (
      <>
        <Icon
          name="chevron-back-outline"
          color="#ffffff"
          size={verticalScale(40)}
          onPress={() => navigation.navigate("Main")}></Icon>

        <HeaderButton />
      </>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <ProfileImage
        thumbnail={item.uri}
        status={item.status}
        id={item.id}
        onPressImage={() => handleSelection(item.id, item.status)}
      />
      // <Image
      //   source={{ uri: item.uri }}
      //   style={{ width: 150, height: 150 }}></Image>
    );
  };
  return (
    <View style={styles.mainView}>
      <Header contents={<HeaderContents></HeaderContents>}></Header>
      <Modal isVisible={isModalVisible}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View
            style={{
              width: scale(350),

              height: verticalScale(150),

              borderRadius: 15,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              borderColor: "white",
            }}>
            <View style={{ flex: 2, alignItems: "center" }}>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: verticalScale(24),
                  marginTop: verticalScale(33),
                }}>
                이 프로필을 삭제하시겠어요?
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Button
                  title="삭제"
                  type="clear"
                  titleStyle={styles.headerRightButton}
                  onPress={deleteSelectedImage}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  title="취소"
                  type="clear"
                  titleStyle={[
                    styles.headerRightButton,
                    { color: "rgba(255, 255, 255, 0.5)" },
                  ]}
                  onPress={() => setIsModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingTop: 15 }}>
          <View style={{ flex: 6 }}>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: verticalScale(22),
                color: "white",
              }}>
              가상 헤어를 적용 할
            </Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
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
                  해주세요.
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ flex: 5 }}>
        <FlatList
          data={imageInfo}
          extraData={Object.values(imageInfo)}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingHorizontal: verticalScale(20),

    backgroundColor: "#191919",
  },

  title: {
    fontSize: 32,
  },
  headerRightButton: {
    fontFamily: "Pretendard-Bold",
    fontSize: verticalScale(16),
    color: "#fc2a5b",
  },
});
