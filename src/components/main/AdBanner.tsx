import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Chip } from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";
import React from "react";
import { verticalScale } from "../../utils/scale";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function AdBanner(props) {
  return (
    <View
      style={[
        styles.Banner,
        { backgroundColor: props.mainColor, overflow: "hidden" },
      ]}>
      <View style={{ flex: 1, margin: 19 }}>
        <View style={{ flexDirection: "row" }}>
          <Chip
            title="AI 분석"
            titleStyle={{
              fontFamily: "Pretendard",
              fontSize: 10,
              color: "#ffffff",
            }}
            buttonStyle={{ backgroundColor: props.subColor }}
            style={{ margin: 5 }}
            containerStyle={{ marginRight: 2.5 }}
            size="sm"
          />
          <Chip
            title="맞춤 헤어스타일"
            titleStyle={{
              fontFamily: "Pretendard",

              fontSize: 10,
            }}
            buttonStyle={{ backgroundColor: props.subColor }}
            size="sm"
            containerStyle={{ marginRight: 2.5 }}
          />
        </View>
        <View style={{ marginTop: 9, justifyContent: "center" }}>
          {props.text.map((item, index) => {
            return props.textBold[index] ? (
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontWeight: "bold",
                  color: "#000000",
                  fontSize: verticalScale(16),
                }}
                key={index}>
                {item}
              </Text>
            ) : (
              <Text
                style={{
                  fontFamily: "Pretendard",
                  color: "#000000",
                }}
                key={index}>
                {item}
              </Text>
            );
          })}
        </View>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}>
        <Image
          source={props.thumbnail}
          style={styles.bannerImg}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Banner: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 15,
    flexDirection: "row",

    // backgroundColor: "#e4dcca",
  },
  section: {
    flex: 1,
    alignItems: "center",
  },
  bannerImg: {
    width: verticalScale(200),
    height: verticalScale(149),
    marginBottom: verticalScale(-20),
  },
});
