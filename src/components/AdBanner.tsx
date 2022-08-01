import { StyleSheet, Text, View, Image } from "react-native";
import { Chip } from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";
import React from "react";

export default function AdBanner(props) {
  return (
    <View style={[styles.Banner, { backgroundColor: props.mainColor }]}>
      <View style={{ flex: 1, alignItems: "center", margin: 19 }}>
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
            containerStyle={{ marginHorizontal: 2.5 }}
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
            containerStyle={{ marginHorizontal: 2.5 }}
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
                  fontSize: 16,
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
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
        <Image
          source={require("../Assets/Images/MainBanner1.png")}
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
    width: 119,
    height: 209,
    marginBottom: -50,
  },
});
