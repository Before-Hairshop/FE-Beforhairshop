import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { createRef, useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { WebView, WebViewNavigation } from "react-native-webview";
import CookieManager from "@react-native-cookies/cookies";

import { scale, verticalScale } from "../utils/scale";
import { getMemberInfo } from "../api/getMemberInfo";
import { storeData } from "../utils/asyncStorage";
import GoogleLoginIcon from "../components/loading/GoogleLoginIcon";
import KakaoLoginIcon from "../components/loading/KakaoLoginIcon";
import NaverLoginIcon from "../components/loading/NaverLoginIcon";
import AppleLoginIcon from "../components/loading/AppleLoginIcon";

const socialLoginURI = {
  google: "http://localhost:8080/oauth2/authorization/google",
  kakao: "http://localhost:8080/oauth2/authorization/kakao",
  naver: "http://localhost:8080/oauth2/authorization/naver",
  logout: "http://localhost:8080/logout",
};

const userAgent = "useragent";

// const Logo = require("../assets/images/Logo.png");

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
        useNativeDriver: false,
      }).start();
    }
  }, [isUserLoggedIn]);

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
    try {
      const result = await getMemberInfo();
      console.log(result.status);
      if (result.data.result) {
        setIsUserLoggedIn(true);
        // setIsUserLoggedIn(false);
      } else {
        setIsUserLoggedIn(false);
        // setIsUserLoggedIn(true);
      }
    } catch (error) {
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
              <GoogleLoginIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => signIn("kakao")}>
              <KakaoLoginIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => signIn("naver")}>
              <NaverLoginIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => signIn("logout")}>
              <AppleLoginIcon />
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
          // originWhitelist={["*"]}
          source={{
            uri: socialLoginURI[loginType],
            // uri: socialLoginURI["logout"],
          }}
          userAgent={userAgent}
          onNavigationStateChange={onNavigationStateChange} // WebView 로딩이 시작되거나 끝나면 호출해주는 것
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
          // useWebKit={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
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
    height: scale(60),
  },
});
