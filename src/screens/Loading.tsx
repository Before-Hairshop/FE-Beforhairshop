import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import React, { createRef, useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { WebView, WebViewNavigation } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CookieManager from "@react-native-cookies/cookies";

import { scale, verticalScale } from "../utils/scale";
import axios from "axios";

const socialLoginURI = {
  google: "http://localhost:8080/oauth2/authorization/google",
  kakao: "http://localhost:8080/oauth2/authorization/kakao",
  naver: "http://localhost:8080/oauth2/authorization/naver",
  logout: "http://localhost:8080/logout",
};

const userAgent =
  Platform.OS === "android"
    ? "Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
    : "AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75";

const Logo = require("../assets/images/Logo.png");

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

const wait = (timeToDelay: number) => {
  return new Promise(resolve => setTimeout(resolve, timeToDelay));
};

export default function Loading() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState("");
  const [socialLoginModalVisible, setSocialLoginModalVisible] = useState(false);
  const [loginType, setLoginType] = useState("");

  const navigation = useNavigation();
  const webViewRef = createRef<WebView>();
  const opacity = new Animated.Value(0);

  const signIn = async (type: string) => {
    await setLoginType(type);
    setSocialLoginModalVisible(true);
  };

  useEffect(() => {
    async function waitForSecond() {
      await wait(2000);
      await callAPI();
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

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem("@SESSION_ID", value);
    } catch (error) {
      //
    }
  };

  const onNavigationStateChange = async (
    navigationState: WebViewNavigation,
  ) => {
    // console.log(navigationState);
    if (navigationState.url == "http://localhost:8080/") {
      const cookies = await CookieManager.get("http://localhost:8080");
      storeData(cookies.JSESSIONID.value);
      setSocialLoginModalVisible(false);
      setIsUserLoggedIn(true);
    }
  };

  const callAPI = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/members", {
      // headers: {
      //   JSESSIONID: "value",
      // },
    });
    console.log(result);
    if (result.data.result) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  };

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
            <TouchableOpacity onPress={() => signIn("google")}>
              <View
                style={[
                  styles.iconStyle,
                  {
                    backgroundColor: "#ffffff",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: scale(60),
                  },
                ]}>
                <Image
                  source={require("../assets/icons/google_login.png")}
                  style={{
                    width: scale(30),
                    height: verticalScale(30),
                  }}></Image>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => signIn("kakao")}>
              <Image
                source={require("../assets/icons/kakao_login.png")}
                style={styles.iconStyle}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => signIn("naver")}>
              <Image
                source={require("../assets/icons/naver_login.png")}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => signIn("")}>
              <View
                style={[
                  styles.iconStyle,
                  {
                    backgroundColor: "#ffffff",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: scale(60),
                  },
                ]}>
                <Image
                  source={require("../assets/icons/apple_login.png")}
                  style={{
                    width: scale(30),
                    height: verticalScale(30),
                    top: verticalScale(-2),
                  }}></Image>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={socialLoginModalVisible}>
        <WebView
          ref={webViewRef}
          cacheEnabled={false}
          // onLoad={() => {
          //   console.log(
          //     webViewRef.postMessage("전송 데이터(React) : 웹으로 데이터 전송"),
          //   );
          // }}
          // originWhitelist={["*"]}
          source={{ uri: socialLoginURI[loginType] }}
          // userAgent={userAgent}
          // WebView 로딩이 시작되거나 끝나면 호출해주는 것
          onNavigationStateChange={onNavigationStateChange}
          // onMessage={onMessage}
          onMessage={evt => {
            console.log("받은 데이터: " + evt);
          }}
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
          // useWebKit={true}
          javaScriptEnabled={true}
        />
      </Modal>
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
    marginHorizontal: verticalScale(10.5),
    width: scale(60),
    height: verticalScale(60),
  },
});
