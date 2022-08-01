import { StyleSheet, Text, View, Platform, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar } from "@rneui/themed";
import Swiper from "react-native-swiper";
import AdBanner from "../components/AdBanner";
import MainNavigateButton from "../components/MainNavigateButton";

export default function Main(props) {
  const [slideTime, setSlideTime] = useState(1);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const bannerLists = [
    "../Assets/Images/MainBanner1.png",
    "../Assets/Images/MainBanner2.png",
  ];
  useEffect(() => {
    const autoTimer = setTimeout(() => setSlideTime(10), 1000);
    return () => clearTimeout(autoTimer);
  }, []);
  const themeColor = ["#c5b593", "#db4544"];

  return (
    <View style={styles.mainView}>
      <View style={{ flex: 5 }}>
        <View style={styles.header}>
          <Text style={styles.Title}>BEFORE HAIRSHOP</Text>
          <Avatar
            activeOpacity={0.2}
            avatarStyle={{}}
            containerStyle={{ backgroundColor: "#BDBDBD" }}
            icon={{}}
            iconStyle={{}}
            imageProps={{}}
            onLongPress={() => alert("onLongPress")}
            onPress={() => alert("onPress")}
            overlayContainerStyle={{}}
            placeholderStyle={{}}
            rounded
            title="P"
            titleStyle={{}}
          />
        </View>

        <View style={{ flex: 1, paddingTop: 15 }}>
          <View style={{ flex: 6 }}>
            <Swiper
              // onIndexChanged={index => setSwiperIndex(index)}
              style={styles.wrapper}
              autoplay
              autoplayTimeout={slideTime}
              activeDot={
                <View
                  style={{
                    backgroundColor: "white",
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                />
              }>
              <AdBanner
                mainColor="#e4dcca"
                subColor="#c5b593"
                text={["AI 분석으로", "나에게 맞는 헤어스타일", "알아보기"]}
                textBold={[true, true, false]}></AdBanner>
              <AdBanner
                mainColor="#fcf1f0"
                subColor="#db4544"
                text={[
                  "헤어 디자이너와",
                  "상담을 통해 추천 받는",
                  "맞춤형 헤어스타일",
                ]}
                textBold={[false, false, true]}></AdBanner>
            </Swiper>
          </View>
          <View style={{ flex: 8 }}>
            <View style={{ flex: 1 }}>
              <MainNavigateButton></MainNavigateButton>
            </View>
            <View style={{ flex: 1 }}>
              <MainNavigateButton></MainNavigateButton>
            </View>
          </View>
        </View>
      </View>

      <View style={{ flex: 3 }}>
        <Text style={styles.Title}>인기 헤어스타일</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 20,
    paddingTop: 32,

    backgroundColor: "#191919",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Title: {
    width: 164,

    height: 21,

    fontFamily: "Pretendard-Bold",

    fontSize: 18,

    fontWeight: "bold",

    fontStyle: "normal",

    letterSpacing: 0.07,

    textAlign: "left",

    color: "#ffffff",
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 15,

    backgroundColor: "#e4dcca",
  },

  slide2: {
    flex: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcf1f0",
  },

  slide3: {
    flex: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
