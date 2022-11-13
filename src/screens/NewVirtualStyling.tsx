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
import React, { useEffect } from "react";
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
import { getPreVirtualResult } from "../api/getPreVirtualResult";
import SimpleHeader from "../components/common/SimpleHeader";

import FirstStyle from "../assets/icons/virtual/hair_1.svg";
import SecondStyle from "../assets/icons/virtual/hair_2.svg";
import ThirdStyle from "../assets/icons/virtual/hair_3.svg";
import FourthStyle from "../assets/icons/virtual/hair_4.svg";
import FifthStyle from "../assets/icons/virtual/hair_5.svg";
import Spinner from "../components/common/Spinner";
import { getVirtualResult } from "../api/getVirtualResult";

const BASE = "base";

const SELECTED = "selected";

const hairstyleInfo = [
  ["None", "단발 C컬펌"],
  ["afro", "긴머리 C컬펌"],
  ["bowl cut", "칼단발"],
  ["braid", "가르마"],
  ["caesar cut", "포마드"],
];

const hairstyleImage = [
  <FirstStyle width={verticalScale(150)} height={verticalScale(150)} />,
  <SecondStyle width={verticalScale(150)} height={verticalScale(150)} />,
  <ThirdStyle width={verticalScale(150)} height={verticalScale(150)} />,
  <FourthStyle width={verticalScale(150)} height={verticalScale(150)} />,
  <FifthStyle width={verticalScale(150)} height={verticalScale(150)} />,
];

export default function NewVirtualStyling({ route }) {
  const navigation = useNavigation();
  const [selectedHairstyleIndex, setSelectedHairstyleIndex] = useState(-1);
  const [isHairModalVisible, setIsHairModalVisible] = useState(false);
  const [resultImg, setResultImg] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (route.params.id == 0.1 || route.params.id == 0.2) {
        console.log("pre result");
        console.log(route.params);
        const res = await getPreVirtualResult(route.params.id * 10);
        console.log(res);
        if (res.data.result == undefined) {
          setLoading(false);
          Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
          navigation.navigate("Loading", {
            reload: true,
          });
        } else if (res.data.status == "OK") {
          setResultImg(res.data.result);
          setLoading(false);
        } else {
          Alert.alert("데이터를 불러오는데 실패했습니다.");
          setLoading(false);
        }
      } else {
        console.log("inference result");
        console.log(route.params);
        const res = await getVirtualResult(route.params.id);
        console.log(res);
        if (res.data.result == undefined) {
          setLoading(false);
          Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
          navigation.navigate("Loading", {
            reload: true,
          });
        } else if (res.data.status == "OK") {
          setResultImg(res.data.result);
          setLoading(false);
        } else {
          Alert.alert("데이터를 불러오는데 실패했습니다.");
          setLoading(false);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.frame}>
      {/* <ComplexityHeader
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
      /> */}
      <SimpleHeader title="가상 헤어스타일링" goBack="Main" />
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
      <View style={{ flex: 1 }}>
        <Image
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
          // style={{ flex: 1 }}
          // source={{
          //   uri: store.getState().Profile.selectedImage.uri,
          // }}
          source={
            selectedHairstyleIndex == -1
              ? { uri: route.params.uri }
              : { uri: resultImg[selectedHairstyleIndex] }
          }
        />
      </View>
      <View
      // style={{ flex: 2 }}
      >
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
                    // toggleHairModal();
                  }}
                />
              ) : (
                <HairColorItem
                  content={hairstyleInfo[index][1]}
                  status={BASE}
                  thumbnail={hairstyleImage[index]}
                  onPressImage={() => {
                    setSelectedHairstyleIndex(index);
                    // toggleHairModal();
                  }}
                />
              );
            })}
          </ScrollView>
        </View>

        <View
          style={{
            height: verticalScale(80),
            backgroundColor: "#191919",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <TouchableOpacity
            style={{
              width: "90%",
              height: verticalScale(50),
              backgroundColor: "#fc2a5b",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              navigation.navigate("VirtualServiceCenter");
            }}>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: verticalScale(16),
                fontWeight: "600",
                fontStyle: "normal",
                textAlign: "center",
                color: "#ffffff",
              }}>
              피드백 보내기
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View
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
        </View> */}
      </View>
      {/* </View> */}
      {loading && <Spinner />}
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
