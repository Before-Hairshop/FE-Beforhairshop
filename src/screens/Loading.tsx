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

const wait = (timeToDelay: number) => {
  return new Promise(resolve => setTimeout(resolve, timeToDelay));
};

const opacity = new Animated.Value(0);

export default function Loading() {
  const [socialLoginModalVisible, setSocialLoginModalVisible] = useState(false);
  const [loginType, setLoginType] = useState("");

  const navigation = useNavigation();
  const webViewRef = createRef<WebView>();

  const signIn = async (type: string) => {
    await setLoginType(type);
    setSocialLoginModalVisible(true);
  };

  const onNavigationStateChange = async (
    navigationState: WebViewNavigation,
  ) => {
    // console.log(navigationState);
    if (navigationState.url == "http://localhost:8080/") {
      const cookies = await CookieManager.get("http://localhost:8080");
      await storeData(cookies.JSESSIONID.value);
      setSocialLoginModalVisible(false);
      navigation.navigate("ServiceTerms");
    }
  };

  const callAPI = async () => {
    try {
      const result = await getMemberInfo();
      console.log(result.data);
      if (result.data.result) {
        if (result.data.status == "BAD_REQUEST") {
          navigation.navigate("ServiceTerms");
        } else {
          navigation.navigate("NewMain");
        }
      } else {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function waitForSecond() {
      await wait(2000);
      await callAPI();
    }
    waitForSecond();
  }, []);

  return (
    <View style={styles.frame}>
      <View style={styles.container} />
      <View style={styles.text_animation_container}>
        <Animated.View
          style={[
            styles.text_animation,
            {
              bottom: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, verticalScale(200)],
              }),
            },
          ]}>
          <Text style={styles.mainText}>BEFORE</Text>
          <Text style={styles.mainText}>HAIRSHOP</Text>
        </Animated.View>
      </View>
      <View style={styles.icon_animation_container}>
        <Animated.View
          style={{
            opacity: opacity,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text style={styles.subText}>SNS 계정으로 간편가입하기 </Text>
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
          source={{
            uri: socialLoginURI[loginType],
          }}
          userAgent={userAgent}
          onNavigationStateChange={onNavigationStateChange}
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#191919",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text_animation_container: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  text_animation: {
    alignItems: "center",
  },
  icon_animation_container: { flex: 1 },
  mainText: {
    fontSize: scale(32),
    color: "#ffffff",
    fontFamily: "Pretendard-Bold",
  },
  subText: {
    opacity: 0.5,
    fontFamily: "Pretendard",
    fontSize: 12,
    color: "#ffffff",
  },
  iconStyle: {
    marginHorizontal: verticalScale(10.5),
    width: scale(60),
    height: scale(60),
  },
});
