import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "@rneui/themed";
import { verticalScale, scale } from "../utils/scale";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useStore } from "react-redux";
import HairColorItem from "../components/VirtualStyling/HairColorItem";
import StyleModal from "../components/VirtualStyling/StyleModal";
import ComplexityHeader from "../components/common/ComplexityHeader";
import DownloadIcon from "../assets/icons/download_icon.svg";

const BASE = "base";

const SELECTED = "selected";

const colorInfo = ["블랙", "브라운", "옐로우", "레드", "블루", "오렌지"];
const colorImage = [
  require("../assets/images/virtualStyling/black_hair.png"),
  require("../assets/images/virtualStyling/brown_hair.png"),
  require("../assets/images/virtualStyling/yellow_hair.png"),
  require("../assets/images/virtualStyling/red_hair.png"),
  require("../assets/images/virtualStyling/blue_hair.png"),
  require("../assets/images/virtualStyling/orange_hair.png"),
];

const hairstyleInfo = [
  ["None", "원래 머리"],
  ["afro", "뽀글이"],
  ["bowl cut", "투블럭"],
  ["braid", "토르 머리"],
  ["caesar cut", "올림 머리"],
  ["chignon", "물 젖은 머리"],
  // ["dreadlocks", "장발 뽀글이"],
  // ["fauxhawk", "모호크"],
  // ["jewfro", "아프로"],
  // ["perm", "펌"],
  // ["pixie cut", "픽시 컷"],
  // ["psychobilly wedge", "펑크"],
  // ["regular taper cut", "테이퍼 컷"],
  // ["shingle bob", "보브컷"],
  // ["short hair", "숏컷"],
  // ["slicked-back", "올백"],
];

const hairstyleImage = [
  require("../assets/images/virtualStyling/original_hairstyle.jpg"),
  require("../assets/images/virtualStyling/afro_hairstyle.jpg"),
  require("../assets/images/virtualStyling/bowl_cut_hairstyle.jpg"),
  require("../assets/images/virtualStyling/braid_hairstyle.jpg"),
  require("../assets/images/virtualStyling/caesar_cut_hairstyle.jpg"),
  require("../assets/images/virtualStyling/chignon_hairstyle.jpg"),
  // require("../assets/images/virtualStyling/dreadlocks_hairstyle.jpg"),
  // require("../assets/images/virtualStyling/fauxhawk_hairstyle.jpg"),
  // require("../assets/images/virtualStyling/jewfro_hairstyle.jpg"),
  // require("../assets/images/virtualStyling/perm_hairstyle.jpg"),
  // require("../assets/images/virtualStyling/pixie_cut_hairstyle.jpg"),
  // require("../assets/images/virtualStyling/psychobilly_wedge_hairstyle.jpg"),
  // require("../assets/images/virtualStyling/regular_taper_cut_hairstyle.jpg"),
  // require("../assets/images/virtualStyling/shingle_bob_hairstyle.jpg"),
  // require("../assets/images/virtualStyling/short_hair_hairstyle.jpg"),
  // require("../assets/images/virtualStyling/slicked-back_hairstyle.jpg"),
];

const allHairstyleInfo = [
  ["None", "원래 머리"],
  ["afro", "뽀글이"],
  ["bowl cut", "투블럭"],
  ["braid", "토르 머리"],
  ["caesar cut", "올림 머리"],
  ["chignon", "물 젖은 머리"],
  ["dreadlocks", "장발 뽀글이"],
  ["fauxhawk", "모호크"],
  ["jewfro", "아프로"],
  ["perm", "펌"],
  ["pixie cut", "픽시 컷"],
  ["psychobilly wedge", "펑크"],
  ["regular taper cut", "테이퍼 컷"],
  ["shingle bob", "보브컷"],
  ["short hair", "숏컷"],
  ["slicked-back", "올백"],
];

const allHairstyleImage = [
  require("../assets/images/virtualStyling/original_hairstyle.jpg"),

  require("../assets/images/virtualStyling/afro_hairstyle.jpg"),
  require("../assets/images/virtualStyling/bowl_cut_hairstyle.jpg"),
  require("../assets/images/virtualStyling/braid_hairstyle.jpg"),
  require("../assets/images/virtualStyling/caesar_cut_hairstyle.jpg"),
  require("../assets/images/virtualStyling/chignon_hairstyle.jpg"),
  require("../assets/images/virtualStyling/dreadlocks_hairstyle.jpg"),
  require("../assets/images/virtualStyling/fauxhawk_hairstyle.jpg"),
  require("../assets/images/virtualStyling/jewfro_hairstyle.jpg"),
  require("../assets/images/virtualStyling/perm_hairstyle.jpg"),
  require("../assets/images/virtualStyling/pixie_cut_hairstyle.jpg"),
  require("../assets/images/virtualStyling/psychobilly_wedge_hairstyle.jpg"),
  require("../assets/images/virtualStyling/regular_taper_cut_hairstyle.jpg"),
  require("../assets/images/virtualStyling/shingle_bob_hairstyle.jpg"),
  require("../assets/images/virtualStyling/short_hair_hairstyle.jpg"),
  require("../assets/images/virtualStyling/slicked-back_hairstyle.jpg"),
];

export default function NewVirtualStyling() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const store = useStore();
  const [selectedColorIndex, setSelectedColorIndex] = useState(-1);
  const [selectedHairstyleIndex, setSelectedHairstyleIndex] = useState(-1);
  const [isHairModalVisible, setIsHairModalVisible] = useState(false);

  const toggleHairModal = () => {
    setIsHairModalVisible(!isHairModalVisible);
  };
  const HeaderContents = () => {
    return (
      <>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingRight: verticalScale(20),
            paddingLeft: verticalScale(20),
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              // justifyContent: "center",
            }}>
            <Icon
              name="chevron-back-outline"
              color="#ffffff"
              size={verticalScale(40)}
              onPress={() => navigation.navigate("ProfileSelection")}></Icon>
            <Icon
              name="home-outline"
              color="#ffffff"
              size={verticalScale(30)}
              onPress={() => navigation.navigate("Main")}></Icon>
          </View>

          <View
            style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
            <Text
              style={{
                fontFamily: "pretendard",
                fontSize: verticalScale(18),
                color: "#fff",
              }}>
              가상 헤어스타일링
            </Text>
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button
              type="clear"
              title={
                <Image
                  source={require("../assets/images/down_icon.png")}></Image>
              }

              // titleStyle={styles.headerRightButton}
            />
          </View>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={styles.frame}>
      <ComplexityHeader
        title="가상 헤어스타일링"
        goBack="Main"
        button={
          <TouchableOpacity
            onPress={() => {
              Alert.alert("준비중");
            }}>
            <DownloadIcon />
          </TouchableOpacity>
        }
      />
      {/* <StyleModal
        isHairModalVisible={isHairModalVisible}
        toggleHairModal={toggleHairModal}
      /> */}
      {/* <View style={styles.mainView}> */}
      {/* <Header contents={<HeaderContents></HeaderContents>}></Header> */}
      {/* <View style={{ flex: 1, backgroundColor: "#141316" }}>
        <Image
          style={{ flex: 1 }}
          source={{
            uri: store.getState().Profile.selectedImage.uri,
          }}
        />
      </View> */}
      <Image
        style={{ flex: 1 }}
        source={{
          uri: store.getState().Profile.selectedImage.uri,
        }}
      />
      <View
      // style={{ flex: 2 }}
      >
        {/* <View style={[styles.hairColorItemView, { borderBottomWidth: 2 }]}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ marginTop: scale(10) }}>
            {colorInfo.map((item, index) => {
              return selectedColorIndex == index ? (
                <HairColorItem
                  content={colorInfo[index]}
                  status={SELECTED}
                  thumbnail={colorImage[index]}
                  onPressImage={() => setSelectedColorIndex(-1)}
                />
              ) : (
                <HairColorItem
                  content={colorInfo[index]}
                  status={BASE}
                  thumbnail={colorImage[index]}
                  onPressImage={() => setSelectedColorIndex(index)}
                />
              );
            })}
          </ScrollView>
        </View> */}

        <View style={styles.hairColorItemView}>
          <ScrollView horizontal={true}>
            {hairstyleInfo.map((item, index) => {
              return selectedHairstyleIndex == index ? (
                <HairColorItem
                  content={hairstyleInfo[index][1]}
                  status={SELECTED}
                  thumbnail={hairstyleImage[index]}
                  onPressImage={() => {
                    setSelectedHairstyleIndex(-1);
                    toggleHairModal();
                  }}
                />
              ) : (
                <HairColorItem
                  content={hairstyleInfo[index][1]}
                  status={BASE}
                  thumbnail={hairstyleImage[index]}
                  onPressImage={() => {
                    setSelectedHairstyleIndex(index);
                    toggleHairModal();
                  }}
                />
              );
            })}
          </ScrollView>
        </View>

        <View
          style={{
            height: verticalScale(45),
            backgroundColor: "#191919",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View
            style={{
              justifyContent: "center",
              paddingHorizontal: verticalScale(10),
            }}>
            <Button
              title={<Text style={styles.bottomButton}>취소</Text>}
              type="clear"
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              paddingHorizontal: verticalScale(10),
            }}>
            <Button
              title={<Text style={styles.bottomButton}>공유하기</Text>}
              type="clear"
            />
          </View>
        </View>
      </View>
      {/* </View> */}
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
  mainView: {
    paddingRight: 0,
    paddingLeft: 0,
    flex: 1,
    // paddingHorizontal: verticalScale(20),
    backgroundColor: "#191919",
  },
  hairColorItemView: {
    height: verticalScale(130),
    backgroundColor: "#0c0c0c",
    flexDirection: "row",
    paddingLeft: verticalScale(10),
    paddingRight: verticalScale(10),
  },
  bottomButton: {
    fontFamily: "Pretendard",
    fontSize: verticalScale(16),
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: -0.5,
    textAlign: "left",
    color: "#ffffff",
  },
});
