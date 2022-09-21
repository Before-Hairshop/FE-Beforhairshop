import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import GoBackIcon from "../assets/icons/goBack.svg";
import React, { useState, useEffect } from "react";

import { scale, verticalScale } from "../utils/scale";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/native";
import HighlightText from "react-native-highlight-underline-text";

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
  const HeaderContents = () => {
    return (
      <>
        <View style={{ flex: 1 }}>
          <GoBackIcon />
        </View>
        <View
          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "Pretendard-Bold",
              fontSize: scale(18),
              fontWeight: "bold",
              fontStyle: "normal",
              letterSpacing: 0.07,
              textAlign: "left",
              color: "#ffffff",
            }}>
            헤어 디자이너 {designerName}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}></View>
      </>
    );
  };

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

  const SuggestionItem = ({ index, item }) => {
    return (
      <>
        <UnderLineContent
          value={`추천 스타일 No. ${index + 1}`}
          fontSize={scale(22)}></UnderLineContent>
        <TouchableOpacity
          style={{
            borderColor: MAINCOLOR,
            borderWidth: 1,
            borderRadius: scale(16),
            paddingHorizontal: scale(10),
            paddingVertical: verticalScale(3),
            marginTop: verticalScale(18),
            alignSelf: "baseline",
          }}
          disabled>
          <View style={{}}>
            <Text style={{ color: MAINCOLOR }}>
              {suggestionList[index].hairstyleName}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.baseText}>{suggestionList[index].reason}</Text>
        <View
          style={{ flexDirection: "row", marginVertical: verticalScale(17) }}>
          {suggestionList[index].imageUrl.map((item, innerIndex) => {
            console.log(suggestionList[index].imageUrl[innerIndex]);
            return (
              <Image
                source={{ uri: suggestionList[index].imageUrl[innerIndex] }}
                style={{
                  width: "30%",
                  aspectRatio: 1,
                  marginHorizontal: verticalScale(6),
                  borderRadius: 10,

                  overflow: "hidden",
                  borderWidth: 2,
                  borderColor: "#373737",
                }}
              />
            );
          })}
        </View>
        <Text style={styles.baseText}>
          가격:{" "}
          <Text style={{ color: MAINCOLOR }}>
            {suggestionList[index].price} 원
          </Text>
        </Text>
      </>
    );
  };

  return (
    <View style={styles.mainView}>
      <Header contents={<HeaderContents></HeaderContents>}></Header>

      <View style={{ flex: 9 }}>
        <ScrollView>
          <View style={{ flex: 1, paddingTop: 15 }}>
            <View style={{ flex: 6 }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: scale(22),
                  color: "white",
                }}>
                안녕하세요?
              </Text>
              <View style={{ flexDirection: "row" }}>
                <UnderLineContent
                  value={`헤어디자이너 ${designerName}`}
                  fontSize={scale(22)}></UnderLineContent>
                <Text>
                  <Text
                    style={{
                      fontFamily: "Pretendard-Regular",
                      fontSize: scale(22),
                      color: "white",
                    }}>
                    입니다.
                  </Text>
                </Text>
              </View>

              <Text style={styles.baseText}>{greeting}</Text>
            </View>

            {suggestionList.map((item, index) => {
              return <SuggestionItem index={index}></SuggestionItem>;
            })}
          </View>
        </ScrollView>
      </View>

      <View style={{ flex: 2 }}>
        <TouchableOpacity
          style={{
            width: "100%",
            height: verticalScale(55),
            backgroundColor: "#fc2a5b",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            marginTop: verticalScale(30.5),
          }}
          onPress={() => {
            navigation.navigate("DesignerProfile");
          }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}></View>
            <View
              style={{
                flex: 10,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: 16,
                  fontWeight: "600",
                  fontStyle: "normal",
                  letterSpacing: -0.16,
                  color: "#ffffff",
                }}>
                디자이너 프로필 보러가기
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Icon
                name="chevron-forward-outline"
                size={verticalScale(30)}
                color="#fc7292"
              />
            </View>
          </View>
        </TouchableOpacity>
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

  baseText: {
    color: "#eeeeee",
    fontSize: scale(14),
    fontFamily: "Pretendard",
    paddingVertical: verticalScale(15),
  },
});
