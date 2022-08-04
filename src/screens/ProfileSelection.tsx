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
import { verticalScale } from "../utils/scale";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileImage from "../components/ProfileImage";
import { useNavigation } from "@react-navigation/native";

import { getSelectedImage } from "../store/actions/profile_actions";
import { useDispatch, useStore } from "react-redux";

const BASE = "base";
const EDIT = "edit";
const SELECTED = "selected";

export default function ProfileSelection(props) {
  const dispatch = useDispatch();
  const store = useStore();
  const navigation = useNavigation();

  // const profile = useSelector(store => store.Profile);
  let [imageInfo, setImageInfo] = useState([
    { id: "bd7acbeafasd3abb28ba", title: "1 Item", status: BASE },
    {
      id: "3ac68afc-c605-48d3-aafsdfasdf4f8-fbd91aa97f63",
      title: "2 Item",
      status: BASE,
    },
    {
      id: "58694a0f-3da1-471f-asdfasdfbd96-145571e29d72",
      title: "3 Item",
      status: BASE,
    },
    {
      id: "58694a0f-3da1-471f-bd9sadfadsf6-145571e29d72",
      title: "4 Item",
      status: BASE,
    },
    {
      id: "58694a0ffasdfdasf71f-bd96-145571e29d72",
      title: "5 Item",
      status: BASE,
    },
    {
      id: "58694a0f-3daasdfas1-471f-bd9sd6-145571e29d72",
      title: "6 Item",
      status: BASE,
    },
    {
      id: "58694a0f-3daasdfsdfasdas1-471f-bd9sd6-145571e29d72",
      title: "7 Ifsdaftem",
      status: BASE,
    },
  ]);

  let [screenStatus, setScreenStatus] = useState(BASE);

  const startEdit = () => {
    setScreenStatus(EDIT);
    let newArray = [...imageInfo];

    let arrayLength = newArray.length;
    for (let i = 0; i < arrayLength; i++) {
      newArray[i].status = EDIT;
    }
    console.log("edit start");
    setImageInfo(newArray);
  };

  const finishEdit = () => {
    setScreenStatus(BASE);
    let newArray = [...imageInfo];

    let arrayLength = newArray.length;
    for (let i = 0; i < arrayLength; i++) {
      newArray[i].status = BASE;
    }
    console.log("edit finished");
    setImageInfo(newArray);
  };

  const handleSelection = id => {
    if (screenStatus == EDIT) {
      let newArray = [...imageInfo];

      let arrayLength = newArray.length;
      for (let i = 0; i < arrayLength; i++) {
        newArray[i].status = EDIT;
      }
      console.log("edit start");
      setImageInfo(newArray);
    } else {
      console.log("edit finished");
      imageInfo.forEach((item, index) => {
        if (item.id != id) {
          //reset image selection
          imageInfo[index].status = BASE;
        } else if (
          item.id == id &&
          item.id != store.getState().Profile.selectedImage
        ) {
          //when user choose new image
          let newArray = [...imageInfo];
          newArray[index].status = SELECTED;
          setImageInfo(newArray);

          setScreenStatus(SELECTED);
          dispatch(getSelectedImage(id));
        } else {
          //when user choose already selected image
          let newArray = [...imageInfo];
          imageInfo[index].status = BASE;
          setImageInfo(newArray);

          setScreenStatus(BASE);
          dispatch(getSelectedImage(""));
        }
      });
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

  const renderItem = ({ item }) => (
    <ProfileImage
      thumbnail={require("../assets/images/popular_thumbnail.jpeg")}
      status={item.status}
      id={item.id}
      onPressImage={() => handleSelection(item.id)}
    />
  );
  return (
    <View style={styles.mainView}>
      <Header contents={<HeaderContents></HeaderContents>}></Header>
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
            <Text>
              <Text
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: verticalScale(22),
                  color: "white",
                  textDecorationLine: "underline",
                  textDecorationColor: "#8a2139",
                }}>
                프로필을 선택
              </Text>
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
