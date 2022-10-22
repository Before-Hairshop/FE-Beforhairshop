import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import React from "react";

import { scale, verticalScale } from "../../utils/scale";
import RightArrowIcon from "../../assets/icons/common/right_arrow.svg";
import DefaultDesignerImg from "../../assets/images/default_designer_profile.png";
import { useNavigation } from "@react-navigation/native";

const statusDict = ["거절", "대기", "수락"];

export default function Recommendation(props) {
  const navigation = useNavigation();

  return (
    <View style={{ alignItems: "center", marginBottom: verticalScale(10) }}>
      <TouchableOpacity
        style={{
          width: "93%",
          height: verticalScale(148),
          backgroundColor: "#090909",
          borderRadius: 18,
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
                    source={{ uri: props.data.designerImage }}
                    // source={DefaultDesignerImg}
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
                  style={{ justifyContent: "center", marginLeft: scale(17) }}>
                  <Text
                    style={{
                      fontFamily: "Pretendard",
                      fontSize: scale(16),
                      fontWeight: "normal",
                      textAlign: "left",
                      color: "#ffffff",
                    }}>
                    {props.data.designerName} 디자이너의 추천서
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
              <RightArrowIcon />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
