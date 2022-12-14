import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import HighlightText from "react-native-highlight-underline-text";

import { scale, verticalScale } from "../utils/scale";
import SimpleHeader from "../components/common/SimpleHeader";
import Contour from "../components/common/Contour";
import DefaultImg from "../assets/images/default_designer_profile.png";
import { getRecommendation } from "../api/getRecommendation";
import { readData } from "../utils/asyncStorage";
import { patchRecommendAccept } from "../api/patchRecommendAccept";
import { patchRecommendReject } from "../api/patchRecommendReject";
import ImageModal from "../components/common/ImageModal";
import SearchIcon from "../assets/icons/search.svg";
import DownArrowIcon from "../assets/icons/down_arrow.svg";

const MAINCOLOR = "#fc2a5b";
const GRAYCOLOR = "#555555";

const thumbnail =
  "https://via.placeholder.com/300.png/09f/fffC/O%20https://placeholder.com/";

export default function Suggestion({ route }) {
  const [recommendData, setRecommendData] = useState(undefined);
  const [designerFlag, setDesignerFlag] = useState(undefined);

  const [designerName, setDesignerName] = useState("adasdfdsdf");
  const [greeting, setGreeting] = useState("");
  const [openImgUri, setOpenImgUri] = useState(null);

  const navigation = useNavigation();

  const UnderLineContent = ({ value, fontSize }) => (
    <HighlightText
      isFixed={false}
      ratio={0.26}
      underlineColor="rgba(252, 42, 91, 0.5)"
      textStyle={{
        fontFamily: "Pretendard",
        fontSize: scale(fontSize),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff",
      }}
      text={value}
    />
  );

  const matchingAccept = id => {
    patchRecommendAccept(id).then(res => {
      if (res.data.result == undefined) {
        Alert.alert("????????? ?????????????????????. ?????? ????????? ????????????.");
        navigation.navigate("Loading", {
          reload: true,
        });
      } else if (res.data.status == "OK") {
        Alert.alert(
          `${recommendData.designerName}?????? ????????? ???????????? ?????????????????????.`,
        );
        // navigation.navigate("NewMain");
        navigation.reset({
          routes: [
            {
              name: "NewMain",
              params: { reload: true },
            },
          ],
        });
      } else {
        Alert.alert("????????? ??????????????????.");
      }
    });
  };

  const matchingReject = id => {
    console.log(id);
    patchRecommendReject(id).then(res => {
      if (res.data.result == undefined) {
        Alert.alert("????????? ?????????????????????. ?????? ????????? ????????????.");
        navigation.navigate("Loading", {
          reload: true,
        });
      } else if (res.data.status == "OK") {
        Alert.alert(
          `${recommendData.designerName}?????? ????????? ???????????? ?????????????????????.`,
        );
        // navigation.navigate("NewMain");
        navigation.reset({
          routes: [
            {
              name: "NewMain",
              params: { reload: true },
            },
          ],
        });
      } else {
        Alert.alert("????????? ??????????????????.");
      }
    });
  };

  async function fetchData() {
    const result = await getRecommendation(route.params.recommendId);
    if (result.data.result == undefined) {
      Alert.alert("????????? ?????????????????????. ?????? ????????? ????????????.");
      navigation.navigate("Loading", {
        reload: true,
      });
    } else if (result.data.status == "OK") {
      console.log(result);
      setRecommendData(result.data.result);
    } else {
      Alert.alert("???????????? ??????????????? ??????????????????.");
    }
    setDesignerFlag(await readData("@DESIGNER_FLAG"));
  }

  useEffect(() => {
    console.log(route.params);
    fetchData();
    setDesignerName("??????");
    setGreeting(
      "???????????????. ???????????? ?????? ????????? ????????? ?????? ?????????>...?????????????????? ???????????????",
    );
  }, []);

  return (
    <SafeAreaView style={styles.frame}>
      <SimpleHeader title="????????? ?????????" goBack="Main" />
      <Contour />
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <ImageModal uri={openImgUri} setUri={setOpenImgUri} />
        <View
          style={{
            width: "88.8%",
            paddingTop: verticalScale(22),
            paddingBottom: verticalScale(30),
          }}>
          {/* {recommendData != undefined && (
            <Image
              source={{ uri: recommendData.designerImage }}
              style={{
                width: verticalScale(100),
                height: verticalScale(100),
                borderRadius: verticalScale(100),
              }}
            />
          )} */}
          <View>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: 20,
                fontWeight: "normal",
                fontStyle: "normal",
                lineHeight: 30,
                textAlign: "left",
                color: "#ffffff",
              }}>
              ???????????????
            </Text>
            <View style={{ flexDirection: "row" }}>
              {recommendData != undefined && (
                <UnderLineContent
                  value={`?????????????????? ${recommendData.designerName}`}
                  fontSize={scale(20)}
                />
              )}
              {/* <DownArrowIcon
                width={verticalScale(30)}
                height={verticalScale(30)}
              /> */}
              {/* <View style={{ justifyContent: "center" }}>
                <Image
                  source={{ uri: recommendData.designerImage }}
                  style={{
                    width: verticalScale(20),
                    height: verticalScale(20),
                  }}
                />
              </View> */}
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: scale(20),
                  fontWeight: "normal",
                  fontStyle: "normal",
                  lineHeight: 30,
                  textAlign: "left",
                  color: "#ffffff",
                }}>
                {" "}
                ?????????.
              </Text>
            </View>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => {
                navigation.navigate("DesignerProfile", {
                  designerId: recommendData.designerId,
                });
              }}>
              <SearchIcon
                width={verticalScale(15)}
                height={verticalScale(15)}
              />
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: scale(11),
                  fontWeight: "normal",
                  fontStyle: "normal",
                  lineHeight: 20,
                  textAlign: "left",
                  color: "#d8d8d8",
                }}>
                {" "}
                ????????? ????????????
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                marginTop: verticalScale(7),
                fontFamily: "Pretendard",
                fontSize: scale(14),
                fontWeight: "normal",
                fontStyle: "normal",
                lineHeight: 20,
                textAlign: "left",
                color: "#eeeeee",
              }}>
              {recommendData != undefined &&
                recommendData.recommendDto.greeting}
              {/* ???????????????. ???????????? ?????? ????????? ????????? ?????? ?????????. ???????????????
              ???????????? ?????? ???????????????.???????????????. ???????????? ?????? ????????? ?????????
              ?????? ?????????. ??????????????? ???????????? ?????? ???????????????.???????????????.
              ???????????? ?????? ????????? ????????? ?????? ?????????. ??????????????? ???????????? ??????
              ???????????????.???????????????. ???????????? ?????? ????????? ????????? ?????? ?????????.
              ??????????????? ???????????? ?????? ???????????????.???????????????. */}
            </Text>
          </View>
          <View style={{ marginTop: verticalScale(18) }}>
            <UnderLineContent value={"?????? ?????????"} fontSize={scale(20)} />
            <Text
              style={{
                marginTop: verticalScale(15),
                fontFamily: "Pretendard",
                fontSize: scale(17),
                fontWeight: "normal",
                fontStyle: "normal",
                lineHeight: 22,
                textAlign: "left",
                color: "#eeeeee",
              }}>
              "
              {recommendData != undefined &&
                recommendData.recommendDto.hairstyle}
              "
            </Text>
            <Text
              style={{
                marginTop: verticalScale(7),
                fontFamily: "Pretendard",
                fontSize: scale(14),
                fontWeight: "normal",
                fontStyle: "normal",
                lineHeight: 20,
                textAlign: "left",
                color: "#eeeeee",
              }}>
              {recommendData != undefined && recommendData.recommendDto.reason}
              {/* ???????????? ????????? ????????? ??????, ????????? ?????????????????? ??? ????????? ???
              ?????????! ?????? ????????? ????????????????????? ?????????, ??????????????? ?????????
              ???????????????. ???????????????.???????????? ????????? ????????? ??????, ?????????
              ?????????????????? ??? ????????? ??? ?????????! ?????? ????????? ?????????????????????
              ?????????, ??????????????? ????????? ???????????????. ???????????????.???????????? ?????????
              ????????? ??????, ????????? ?????????????????? ??? ????????? ??? ?????????! ?????? ?????????
              ????????????????????? ?????????, ??????????????? ????????? ???????????????. ???????????????. */}
            </Text>
            {recommendData != undefined &&
              recommendData.recommendImageDtoList != null && (
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: verticalScale(10),
                  }}>
                  {recommendData.recommendImageDtoList.map((item, index) => (
                    <Pressable
                      style={{
                        width: "30%",
                        marginRight: verticalScale(4),
                      }}
                      onPress={() => {
                        setOpenImgUri(item.imageUrl);
                      }}>
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={{
                          aspectRatio: 1,
                          borderRadius: verticalScale(10),
                          overflow: "hidden",
                          borderWidth: 1,
                          borderColor: "#373737",
                        }}
                      />
                    </Pressable>
                  ))}
                </View>
              )}
          </View>
          <View style={{ marginTop: verticalScale(18) }}>
            <UnderLineContent value="?????? ??????" fontSize={scale(20)} />
            <Text
              style={{
                marginTop: verticalScale(15),
                fontFamily: "Pretendard",
                fontSize: scale(17),
                fontWeight: "normal",
                fontStyle: "normal",
                lineHeight: 22,
                textAlign: "left",
                color: "#eeeeee",
              }}>
              {recommendData != undefined &&
                // recommendData.recommendDto.treatmentDate +
                recommendData.recommendDto.treatmentDate.substring(0, 4) +
                  "??? " +
                  recommendData.recommendDto.treatmentDate.substring(5, 7) +
                  "??? " +
                  recommendData.recommendDto.treatmentDate.substring(8, 10) +
                  "??? " +
                  recommendData.recommendDto.treatmentDate.substring(11, 13) +
                  "??? " +
                  recommendData.recommendDto.treatmentDate.substring(14, 16) +
                  "???"}
            </Text>
          </View>
          <View style={{ marginTop: verticalScale(18) }}>
            <UnderLineContent value={"??????"} fontSize={scale(20)} />
            <Text
              style={{
                marginTop: verticalScale(15),
                fontFamily: "Pretendard",
                fontSize: scale(17),
                fontWeight: "normal",
                fontStyle: "normal",
                lineHeight: 22,
                textAlign: "left",
                color: "#eeeeee",
              }}>
              {recommendData != undefined &&
                recommendData.recommendDto.price != null &&
                recommendData.recommendDto.price.toLocaleString() + "???"}
            </Text>
          </View>
          {recommendData != undefined &&
            recommendData.recommendDto.recommendStatus == 2 && (
              <View style={{ marginTop: verticalScale(18) }}>
                <UnderLineContent value={"?????? ?????????"} fontSize={scale(20)} />
                <Text
                  style={{
                    marginTop: verticalScale(15),
                    fontFamily: "Pretendard",
                    fontSize: scale(17),
                    fontWeight: "normal",
                    fontStyle: "normal",
                    lineHeight: 22,
                    textAlign: "left",
                    color: "#eeeeee",
                  }}>
                  {recommendData.userPhoneNumber}
                </Text>
              </View>
            )}
        </View>
      </ScrollView>
      {recommendData != undefined &&
        designerFlag != undefined &&
        designerFlag == "0" && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingBottom: verticalScale(20),
            }}>
            <TouchableOpacity
              style={{
                width: scale(156),
                height: verticalScale(60),
                borderRadius: 15,
                backgroundColor: "#00722d",
                shadowColor: "rgba(0, 0, 0, 0.25)",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowRadius: 10,
                shadowOpacity: 1,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0)",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                matchingAccept(recommendData.recommendDto.id);
              }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: scale(18),
                  fontWeight: "normal",
                  letterSpacing: 0,
                  textAlign: "left",
                  color: "#ffffff",
                }}>
                ?????? ??????
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: scale(156),
                height: verticalScale(60),
                borderRadius: 15,
                backgroundColor: "#a02323",
                shadowColor: "rgba(0, 0, 0, 0.25)",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowRadius: 10,
                shadowOpacity: 1,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0)",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                matchingReject(recommendData.recommendDto.id);
              }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: scale(18),
                  fontWeight: "normal",
                  letterSpacing: 0,
                  textAlign: "left",
                  color: "#ffffff",
                }}>
                ?????? ??????
              </Text>
            </TouchableOpacity>
          </View>
        )}
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

  title: {
    fontSize: 32,
  },
  headerRightButton: {
    fontFamily: "Pretendard-Bold",
    fontSize: verticalScale(16),
    color: "#fc2a5b",
  },

  baseText: {
    color: "#eeeeee",
    fontSize: scale(14),
    fontFamily: "Pretendard",
    paddingVertical: verticalScale(15),
  },
});
