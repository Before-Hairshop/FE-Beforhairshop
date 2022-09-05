import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GoBackIcon from "../assets/icons/goBack.svg";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { verticalScale, scale } from "../utils/scale";
import { Button } from "@rneui/themed";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

const numHairStatus = 3;
const numHairTendency = 5;
const BASEWIDTH = 375;
const BASEPADDING = 20;

const HeaderContents = () => (
  <>
    <View style={{ flex: 1 }}>
      <GoBackIcon />
    </View>
    <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontFamily: "Pretendard-Bold",
          fontSize: verticalScale(18),
          fontWeight: "bold",
          fontStyle: "normal",
          letterSpacing: 0.07,
          textAlign: "left",
          color: "#ffffff",
        }}>
        프로필
      </Text>
    </View>
    <View style={{ flex: 1, alignItems: "flex-end" }}>
      <TouchableOpacity>
        <Text style={styles.buttonText}>저장</Text>
      </TouchableOpacity>
    </View>
  </>
);

export default function UserProfileLookup() {
  const [profileImage, setProfileImage] = useState(["", "", ""]);
  const [wantHairImage, setWantHairImage] = useState(["", "", ""]);
  const [hairStatusIndex, setHairStatusIndex] = useState(-1);
  const [hairTendencyIndex, setHairTendencyIndex] = useState(-1);

  const hairStatus = ["많이 상했어요", "보통이에요", "매우 건강해요"];
  const hairTendency = ["심한 곱슬", "곱슬", "반곱슬", "반직모", "직모"];
  useEffect(() => {
    setProfileImage([
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ]);

    setWantHairImage([
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ]);
  }, []);

  return (
    <View style={styles.mainView}>
      <Header contents={<HeaderContents></HeaderContents>}></Header>

      <ScrollView>
        <View style={{ alignItems: "center", margin: verticalScale(10) }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: profileImage[0] }}
              style={styles.userProfileImage}
            />
            <Image
              source={{ uri: profileImage[1] }}
              style={styles.userProfileImage}
            />
            <Image
              source={{ uri: profileImage[2] }}
              style={styles.userProfileImage}
            />
          </View>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={styles.itemTextStyle}> 고객님의 모발 상태 </Text>

          <View style={{ flexDirection: "row" }}>
            {hairStatus.map((item, index) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: scale(
                        (BASEWIDTH - BASEPADDING * 2) / numHairStatus,
                      ),
                    },
                  ]}>
                  <Text style={styles.buttonText}>{hairStatus[index]}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}> 머리 성향 </Text>

          <View style={{ flexDirection: "row" }}>
            {hairTendency.map((item, index) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: scale(
                        (BASEWIDTH - BASEPADDING * 2) / numHairTendency,
                      ),
                    },
                  ]}>
                  <Text style={styles.buttonText}>{hairTendency[index]}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}> 원하는 스타일 </Text>

          <View style={styles.userTextUnderline}>
            <Text style={styles.highlightText}>투블럭</Text>
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <View style={{ flexDirection: "row", marginTop: verticalScale(12) }}>
            {wantHairImage.map((item, index) => {
              return (
                <Image
                  source={{ uri: wantHairImage[index] }}
                  style={styles.wantStyleImage}
                />
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}> 원하는 스타일링 비용 </Text>

          <View style={styles.userTextUnderline}>
            <Text style={styles.highlightText}>30000원</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingHorizontal: 20,

    backgroundColor: "#191919",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  userProfileImage: {
    width: "30%",
    aspectRatio: 1,
    marginHorizontal: verticalScale(6),
    borderRadius: 100,

    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#373737",
  },

  itemTextStyle: {
    fontFamily: "Pretendard",
    fontSize: scale(16),
    marginHorizontal: -5,
    marginBottom: verticalScale(10),
    marginTop: verticalScale(15),

    letterSpacing: 0,

    color: "#ffffff",
  },

  buttonStyle: {
    borderColor: "#fc2a5b",
    borderWidth: 0.8,

    paddingVertical: verticalScale(18),

    alignItems: "center",
  },

  buttonText: {
    color: "#fc2a5b",
  },

  highlightText: {
    fontFamily: "Pretendard",
    fontSize: scale(16),

    marginBottom: verticalScale(10),
    marginTop: verticalScale(15),
    color: "#fc2a5b",
  },

  userTextUnderline: {
    borderBottomColor: "#373737",
    borderBottomWidth: 1,
    width: "100%",
  },

  wantStyleImage: {
    width: "30%",
    aspectRatio: 1,
    marginHorizontal: verticalScale(6),
    borderRadius: 10,

    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#373737",
  },
});
