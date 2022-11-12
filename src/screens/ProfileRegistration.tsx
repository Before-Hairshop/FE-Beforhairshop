import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { verticalScale, scale } from "../utils/scale";
import Spinner from "../components/common/Spinner";
import DefaultPerson from "../assets/images/profileRegistration/default_person.png";
import RuleFrontImg from "../assets/images/profileRegistration/rule_front.svg";
import RuleSideImg from "../assets/images/profileRegistration/rule_side.png";
import RuleBackgroundImg from "../assets/images/profileRegistration/rule_background.png";
import RuleMaskImg from "../assets/images/profileRegistration/rule_mask.png";
import YesIcon from "../assets/icons/common/yes.svg";
import NoIcon from "../assets/icons/common/no.svg";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { resizeImage } from "../utils/resizeImage";
import GoBackIcon from "../assets/icons/goBack.svg";
import { postVirtualStylingImg } from "../api/postVirtualStylingImg";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";
import { postAIReference } from "../api/postAIReference";

const wait = (timeToDelay: number) => {
  return new Promise(resolve => setTimeout(resolve, timeToDelay));
};

export default function ProfileRegistration(props) {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const saveImg = async () => {
    setLoading(true);
    const res = await postVirtualStylingImg(props.profileImage.blob);
    console.log(res);
    if (res.data.result == undefined) {
      Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
      navigation.navigate("Loading", {
        reload: true,
      });
      setLoading(false);
    } else if (res.data.status == "OK") {
      // let newImage = {
      //   id: uuid.v4(),
      //   uri: res.data.result,
      //   status: "base",
      // };
      // let newArray = [...props.imageInfo];
      // let toInsertIndex = newArray.length - 1;
      // newArray.splice(toInsertIndex, 0, newImage);
      // props.setImageInfo(newArray);
      console.log("reference 보내는 id: ", res.data.result.id);
      const result = await postAIReference(res.data.result.id);
      console.log(result);
      await wait(1000);
      props.setIsVisible(false);
      setLoading(false);
    } else {
      Alert.alert("사진 등록에 실패했습니다.");
      setLoading(false);
    }
  };

  return (
    <Modal visible={props.isVisible} animationType="slide">
      <SafeAreaView style={styles.frame}>
        <View
          style={{
            height: verticalScale(70),
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: verticalScale(15),
            paddingBottom: verticalScale(15),
            paddingLeft: verticalScale(8),
            paddingRight: verticalScale(8),
          }}>
          <TouchableOpacity
            style={{
              width: scale(40),
              height: verticalScale(40),
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              props.setIsVisible(false);
            }}>
            <GoBackIcon />
          </TouchableOpacity>
          <View style={{ height: "100%", justifyContent: "center" }}>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: 18,
                fontWeight: "600",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "center",
                color: "#ffffff",
              }}>
              사진 등록하기
            </Text>
          </View>
          <View
            style={{
              width: scale(40),
              height: verticalScale(40),
              justifyContent: "center",
              alignItems: "center",
            }}>
            <TouchableOpacity
              onPress={() => {
                if (props.profileImage == null) {
                  Alert.alert("등록할 사진을 선택해주세요.");
                } else {
                  saveImg();
                }
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
                등록
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image
          source={
            props.profileImage == null
              ? DefaultPerson
              : { uri: props.profileImage.uri + "?" + new Date() }
          }
          style={{ width: "100%", height: undefined, aspectRatio: 1 }}
        />
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: "88.9%",
                paddingTop: verticalScale(20),
              }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View style={{ width: "22%" }}>
                  <View style={styles.rule_img_container}>
                    <RuleFrontImg width="70%" height="70%" />
                  </View>
                  <View style={styles.rule_text_container}>
                    <View style={{ justifyContent: "center" }}>
                      <YesIcon />
                    </View>
                    <Text style={styles.rule_text}> 정면사진</Text>
                  </View>
                </View>
                <View style={{ width: "22%" }}>
                  <View style={styles.rule_img_container}>
                    <Image
                      source={RuleSideImg}
                      style={{ width: "70%", height: "70%" }}
                    />
                  </View>
                  <View style={styles.rule_text_container}>
                    <View style={{ justifyContent: "center" }}>
                      <NoIcon />
                    </View>
                    <Text style={styles.rule_text}> 측면</Text>
                  </View>
                </View>
                <View style={{ width: "22%" }}>
                  <View style={styles.rule_img_container}>
                    <Image
                      source={RuleBackgroundImg}
                      style={{ width: "70%", height: "70%" }}
                    />
                  </View>
                  <View style={styles.rule_text_container}>
                    <View style={{ justifyContent: "center" }}>
                      <NoIcon />
                    </View>
                    <Text style={styles.rule_text}> 복잡한 배경</Text>
                  </View>
                </View>
                <View style={{ width: "22%" }}>
                  <View style={styles.rule_img_container}>
                    <Image
                      source={RuleMaskImg}
                      style={{ width: "70%", height: "70%" }}
                    />
                  </View>
                  <View style={styles.rule_text_container}>
                    <View style={{ justifyContent: "center" }}>
                      <NoIcon />
                    </View>
                    <Text style={styles.rule_text}> 마스크 착용</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{ alignItems: "center" }}>
          <View style={{ width: "88.9%" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: verticalScale(20),
              }}>
              <TouchableOpacity
                style={styles.button_container}
                onPress={async () => {
                  const result = await launchCamera({
                    cameraType: "front",
                    presentationStyle: "fullScreen",
                    maxWidth: 1024,
                    maxHeight: 1024,
                  });
                  const resize_result = await resizeImage(result.assets[0].uri);
                  console.log(resize_result);
                  const res = await fetch(resize_result.uri);
                  const blob = await res.blob();
                  props.setProfileImage({
                    uri: resize_result.uri,
                    blob: blob,
                  });
                }}>
                <Text style={styles.button_text}>카메라</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button_container}
                onPress={async () => {
                  const result = await launchImageLibrary();
                  const resize_result = await resizeImage(result.assets[0].uri);
                  // console.log(resize_result);
                  const res = await fetch(resize_result.uri);
                  const blob = await res.blob();
                  props.setProfileImage({
                    uri: resize_result.uri,
                    blob: blob,
                  });
                }}>
                <Text style={styles.button_text}>갤러리</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {loading && <Spinner />}
      </SafeAreaView>
    </Modal>
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
  rule_img_container: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    backgroundColor: "#0c0c0c",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#222222",
  },
  rule_text_container: {
    marginTop: verticalScale(5),
    flexDirection: "row",
  },
  rule_text: {
    fontFamily: "Pretendard",
    fontSize: verticalScale(11),
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: -0.5,
    textAlign: "left",
    color: "#ffffff",
  },
  button_container: {
    width: "48%",
    height: verticalScale(55),
    borderRadius: verticalScale(10),
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#fc2a5b",
    alignItems: "center",
    justifyContent: "center",
  },
  button_text: {
    fontFamily: "Pretendard",
    fontSize: verticalScale(16),
    fontWeight: "600",
    fontStyle: "normal",
    textAlign: "center",
    color: "#fc2a5b",
  },
});
