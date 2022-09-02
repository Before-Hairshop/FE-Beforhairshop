import { StyleSheet, Text, View, Image, Animated, Alert } from "react-native";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { scale, verticalScale } from "../utils/scale";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Logo = require("../assets/images/Logo.png");

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

const wait = timeToDelay =>
  new Promise(resolve => setTimeout(resolve, timeToDelay));

export default function Loading() {
  const navigation = useNavigation();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState("");

  useEffect(() => {
    async function waitForSecond() {
      await wait(3000);
      setIsUserLoggedIn(true);
    }
    waitForSecond();
  }, []);

  useDidMountEffect(() => {
    if (isUserLoggedIn) {
      navigation.navigate("Main");
    } else {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
      }).start(() => {});
    }
  }, [isUserLoggedIn]);

  let xValue = new Animated.Value(60);
  let opacity = new Animated.Value(0);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#191919",
      }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
        }}></View>
      <View
        style={{
          flex: 1.5,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Animated.View
          style={{
            alignItems: "center",
            bottom: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, verticalScale(200)],
            }),
          }}>
          <Text style={styles.mainText}>BEFORE</Text>
          <Text style={styles.mainText}>HAIRSHOP</Text>
        </Animated.View>
      </View>
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            opacity: opacity,

            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text
            style={{
              opacity: 0.5,

              fontFamily: "Pretendard",

              fontSize: 12,
              color: "#ffffff",
            }}>
            SNS 계정으로 간편가입하기{" "}
          </Text>
          <View style={{ flexDirection: "row", margin: verticalScale(23) }}>
            <Image
              source={require("../assets/icons/google_icon.png")}
              style={styles.iconStyle}></Image>
            <Image
              source={require("../assets/icons/kakao_icon.png")}
              style={styles.iconStyle}></Image>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainText: {
    fontSize: scale(32),
    color: "#ffffff",
    fontFamily: "Pretendard-Bold",
  },

  iconStyle: {
    marginHorizontal: verticalScale(12.5),
  },
});
