import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Linking,
  Pressable,
  Animated,
  Alert,
} from "react-native";
import React from "react";

import { scale, verticalScale } from "../../utils/scale";
import RightArrowIcon from "../../assets/icons/common/right_arrow.svg";
import DefaultDesignerImg from "../../assets/images/default_designer_profile.png";
import { useNavigation } from "@react-navigation/native";
import CallIcon from "../../assets/icons/call.svg";
import { Swipeable } from "react-native-gesture-handler";
import { deleteRecommend } from "../../api/deleteRecommend";

const statusDict = ["거절", "대기", "수락"];

export default function Recommendation(props) {
  const navigation = useNavigation();

  const deleteRecommendation = id => {
    deleteRecommend(id).then(res => {
      console.log(res);
      if (res.data.result == undefined) {
        Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigation.navigate("Loading");
      } else if (res.data.status == "OK") {
        console.log(props.recommendList);
        props.setRecommendList(
          props.recommendList.filter(item => item.recommendDto.id != id),
        );
      } else {
        Alert.alert("삭제 실패");
      }
    });
  };

  const renderRightActions = (dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [0.5, 50],
      outputRange: [0.1, 1],
    });
    return (
      <View
        style={{
          height: verticalScale(148),
          justifyContent: "center",
        }}>
        <Pressable
          style={{
            width: verticalScale(90),
            height: verticalScale(135),
            backgroundColor: "#C22727",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: verticalScale(18),
          }}
          onPress={() => {
            Alert.alert("스타일 추천서 삭제", "정말로 삭제하시겠습니까?", [
              { text: "취소" },
              {
                text: "삭제",
                onPress: () => {
                  deleteRecommendation(props.data.recommendDto.id);
                },
              },
            ]);
          }}>
          <Animated.Text
            style={{
              fontFamily: "Pretendard",
              fontSize: scale(16),
              fontWeight: "normal",
              textAlign: "left",
              color: "#ffffff",
              transform: [{ translateX: trans }],
            }}>
            삭제
          </Animated.Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Swipeable
      useNativeAnimations
      overshootRight={false}
      renderRightActions={dragX =>
        props.designerFlag == "1" &&
        props.status == "accept" &&
        renderRightActions(dragX)
      }>
      <View style={{ alignItems: "center", marginBottom: verticalScale(10) }}>
        <TouchableOpacity
          style={{
            width: "93%",
            height: verticalScale(148),
            borderRadius: verticalScale(18),
            backgroundColor: "#090909",
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowOffset: {
              width: 0,
              height: 20,
            },
            shadowRadius: 20,
            shadowOpacity: 1,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "#191919",
          }}
          onPress={() => {
            navigation.navigate("Suggestion", {
              recommendId: props.data.recommendDto.id,
            });
          }}>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: "89%",
                height: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <View style={{ width: "83%", height: "100%" }}>
                <View
                  style={{
                    height: "40%",
                    flexDirection: "row",
                  }}>
                  <View style={{ justifyContent: "center" }}>
                    <Image
                      source={{
                        uri:
                          props.designerFlag == "1"
                            ? props.data.customerImage
                            : props.data.designerImage,
                      }}
                      style={{
                        width: scale(40),
                        height: scale(40),
                        borderRadius: scale(20),
                        borderWidth: 1,
                        borderColor: "#373737",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      marginLeft: scale(17),
                    }}>
                    <Text
                      style={{
                        fontFamily: "Pretendard",
                        fontSize: scale(16),
                        fontWeight: "normal",
                        textAlign: "left",
                        color: "#ffffff",
                      }}>
                      {props.designerFlag == "1"
                        ? props.data.customerName + " 고객에게 보낸 추천서"
                        : props.data.designerName + " 디자이너의 추천서"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "1%",
                    backgroundColor: "#191919",
                  }}
                />
                <View style={{ height: "59%", justifyContent: "space-evenly" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        width: "50%",
                        fontFamily: "Pretendard",
                        fontSize: scale(11),
                        fontWeight: "normal",
                        textAlign: "left",
                        color: "#c8c8c8",
                      }}>
                      스타일
                    </Text>
                    <Text
                      style={{
                        width: "50%",
                        fontFamily: "Pretendard",
                        fontSize: scale(11),
                        fontWeight: "normal",
                        textAlign: "left",
                        color: "#c8c8c8",
                      }}>
                      {props.data.recommendDto.hairstyle}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        width: "50%",
                        fontFamily: "Pretendard",
                        fontSize: scale(11),
                        fontWeight: "normal",
                        textAlign: "left",
                        color: "#676767",
                      }}>
                      제안금액
                    </Text>
                    <Text
                      style={{
                        width: "50%",
                        fontFamily: "Pretendard",
                        fontSize: scale(11),
                        fontWeight: "normal",
                        fontStyle: "italic",
                        textAlign: "left",
                        color: "#676767",
                      }}>
                      {props.data.recommendDto.price != null
                        ? props.data.recommendDto.price.toLocaleString() + "원"
                        : "없음"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        width: "50%",
                        fontFamily: "Pretendard",
                        fontSize: scale(11),
                        fontWeight: "normal",
                        textAlign: "left",
                        color: "#c8c8c8",
                      }}>
                      거리
                    </Text>
                    <Text
                      style={{
                        width: "50%",
                        fontFamily: "Pretendard",
                        fontSize: scale(11),
                        fontWeight: "normal",
                        textAlign: "left",
                        color: "#c8c8c8",
                      }}>
                      {props.data.distance > 1000
                        ? (props.data.distance / 1000).toFixed(1) + "km"
                        : props.data.distance + "m"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        width: "50%",
                        fontFamily: "Pretendard",
                        fontSize: scale(11),
                        fontWeight: "normal",
                        textAlign: "left",
                        color: "#676767",
                      }}>
                      상태
                    </Text>
                    <View style={{ width: "50%" }}>
                      <View
                        style={{
                          width: scale(44),
                          height: verticalScale(16),
                          borderRadius: 100,
                          backgroundColor:
                            props.data.recommendDto.recommendStatus == 2
                              ? "#00722d"
                              : props.data.recommendDto.recommendStatus == 1
                              ? "#616161"
                              : "#a02323",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                        <Text
                          style={{
                            fontFamily: "Pretendard",
                            fontSize: scale(11),
                            fontWeight: "normal",
                            letterSpacing: 0.5,
                            textAlign: "left",
                            color: "#ffffff",
                          }}>
                          {statusDict[props.data.recommendDto.recommendStatus]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "17%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}>
                {props.status == "accept" ? (
                  <TouchableOpacity
                    style={{
                      width: verticalScale(44),
                      height: verticalScale(44),
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: verticalScale(50),
                      backgroundColor: "#FC2A5B",
                    }}
                    onPress={() => {
                      if (props.designerFlag == "1") {
                        Linking.openURL(
                          `tel:${props.data.customerPhoneNumber}`,
                        ).catch(err => console.error("An error occurred", err));
                      } else {
                        Linking.openURL(
                          `tel:${props.data.designerPhoneNumber}`,
                        ).catch(err => console.error("An error occurred", err));
                      }
                    }}>
                    <CallIcon
                      width={verticalScale(25)}
                      height={verticalScale(25)}
                    />
                  </TouchableOpacity>
                ) : (
                  <RightArrowIcon />
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({});
