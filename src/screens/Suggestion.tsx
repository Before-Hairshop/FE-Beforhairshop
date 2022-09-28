import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import HighlightText from "react-native-highlight-underline-text";

import { scale, verticalScale } from "../utils/scale";
import SimpleHeader from "../components/common/SimpleHeader";
import Contour from "../components/common/Contour";
import DefaultImg from "../assets/images/default_designer_profile.png";

const MAINCOLOR = "#fc2a5b";
const GRAYCOLOR = "#555555";

const thumbnail =
  "https://via.placeholder.com/300.png/09f/fffC/O%20https://placeholder.com/";

export default function ProfileSelection(props) {
  const navigation = useNavigation();
  const [designerName, setDesignerName] = useState("adasdfdsdf");
  const [greeting, setGreeting] = useState("");
  const [suggestionList, setSuggestionList] = useState([
    {
      hairstyleName: "포마드",
      reason:
        "고객님의 헤어를 분석한 결과, 포마드 헤어스타일이 잘 어울릴 것 같아요! 제가 시술한 헤어스타일들을 보시고, 괜찮으시면 저에게 연락주세요. 감사합니다. ",
      imageUrl: [thumbnail, thumbnail, thumbnail],
      price: "15000",
    },
    {
      hairstyleName: "투블럭",
      reason:
        "고객님의 헤어를 분석한 결과, 포마드 헤어스타일이 잘 어울릴 것 같아요! 제가 시술한 헤어스타일들을 보시고, 괜찮으시면 저에게 연락주세요. 감사합니다. ",
      imageUrl: [thumbnail, thumbnail],
      price: "30000",
    },
  ]);

  useEffect(() => {
    setDesignerName("이안");
    setGreeting(
      "반갑습니다. 원하시는 헤어 커트는 저희가 제일 잘해요>...어쩌구어쩌구 방문하세요",
    );
  });

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

  return (
    <View style={styles.frame}>
      <SimpleHeader title="스타일 추천서" goBack="Main" />
      <Contour />
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View
          style={{
            width: "88.8%",
            paddingTop: verticalScale(22),
            paddingBottom: verticalScale(30),
          }}>
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
              안녕하세요
            </Text>
            <View style={{ flexDirection: "row" }}>
              <UnderLineContent
                value={`헤어디자이너 ${designerName} `}
                fontSize={scale(20)}
              />
              <Text>
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
                  입니다.
                </Text>
              </Text>
            </View>
            <Text
              style={{
                marginTop: verticalScale(15),
                fontFamily: "Pretendard",
                fontSize: scale(14),
                fontWeight: "normal",
                fontStyle: "normal",
                lineHeight: 20,
                textAlign: "left",
                color: "#eeeeee",
              }}>
              반갑습니다. 원하시는 헤어 커트는 저희가 제일 잘해요. 방문하시면
              친절하게 시술 해드립니다.반갑습니다. 원하시는 헤어 커트는 저희가
              제일 잘해요. 방문하시면 친절하게 시술 해드립니다.반갑습니다.
              원하시는 헤어 커트는 저희가 제일 잘해요. 방문하시면 친절하게 시술
              해드립니다.반갑습니다. 원하시는 헤어 커트는 저희가 제일 잘해요.
              방문하시면 친절하게 시술 해드립니다.반갑습니다.
            </Text>
          </View>
          <View style={{ marginTop: verticalScale(18) }}>
            <UnderLineContent value={"추천 스타일"} fontSize={scale(20)} />
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
              "포마드"
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
              고객님의 헤어를 분석한 결과, 포마드 헤어스타일이 잘 어울릴 것
              같아요! 제가 시술한 헤어스타일들을 보시고, 괜찮으시면 저에게
              연락주세요. 감사합니다.고객님의 헤어를 분석한 결과, 포마드
              헤어스타일이 잘 어울릴 것 같아요! 제가 시술한 헤어스타일들을
              보시고, 괜찮으시면 저에게 연락주세요. 감사합니다.고객님의 헤어를
              분석한 결과, 포마드 헤어스타일이 잘 어울릴 것 같아요! 제가 시술한
              헤어스타일들을 보시고, 괜찮으시면 저에게 연락주세요. 감사합니다.
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: verticalScale(10),
              }}>
              <Image
                source={DefaultImg}
                style={{
                  width: "30%",
                  aspectRatio: 1,
                  marginHorizontal: verticalScale(4),
                  borderRadius: 10,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: "#373737",
                }}
              />
              <Image
                source={DefaultImg}
                style={{
                  width: "30%",
                  aspectRatio: 1,
                  marginHorizontal: verticalScale(4),
                  borderRadius: 10,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: "#373737",
                }}
              />
              <Image
                source={DefaultImg}
                style={{
                  width: "30%",
                  aspectRatio: 1,
                  marginHorizontal: verticalScale(4),
                  borderRadius: 10,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: "#373737",
                }}
              />
            </View>
          </View>
          <View style={{ marginTop: verticalScale(18) }}>
            <UnderLineContent value={"시술 날짜"} fontSize={scale(20)} />
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
              2022. 09. 26 월요일 PM 12:00
            </Text>
          </View>
          <View style={{ marginTop: verticalScale(18) }}>
            <UnderLineContent value={"가격"} fontSize={scale(20)} />
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
              150,000원
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View
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
            매칭 수락
          </Text>
        </View>
        <View
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
            매칭 거절
          </Text>
        </View>
      </View>
    </View>
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
