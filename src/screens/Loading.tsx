import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Alert,
  TouchableOpacity,
  Linking,
  Modal,
  SafeAreaView,
  Platform,
  NativeSyntheticEvent,
} from "react-native";
import React, { createRef, useEffect, useLayoutEffect, useRef } from "react";
import { scale, verticalScale } from "../utils/scale";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  WebViewMessage,
  WebViewNavigation,
} from "react-native-webview/lib/WebViewTypes";
import CookieManager from "@react-native-cookies/cookies";

const GOOGLE_SOCIAL_LOGIN_URI =
  "http://localhost:8080/oauth2/authorization/google";
// "http://localhost:8080/logout";
const NAVER_SOCIAL_LOGIN_URI =
  "http://localhost:8080/oauth2/authorization/naver";
// "http://localhost:8080/logout";
const KAKAO_SOCIAL_LOGIN_URI =
  "http://127.0.0.1:8080/oauth2/authorization/kakao";

const userAgent =
  // "Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19";
  // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36";
  // "Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19";
  Platform.OS === "android"
    ? "Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
    : "AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75";
// "Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19";
// "customUserAgent";
// "userAgent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36";

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
  const [socialModalVisible, setSocialModalVisible] = useState(false);

  const signInWithGoogle = () => {
    setSocialModalVisible(true);
    // const result = await axios.get(
    //   "http://localhost:8080/oauth2/authorization/google",
    // );
    // Linking.openURL("http://localhost:8080/oauth2/authorization/google");
  };

  const signInWithKakao = () => {
    setSocialModalVisible(true);
    // const result = await axios.get(
    //   "http://localhost:8080/oauth2/authorization/google",
    // );
    // Linking.openURL("http://localhost:8080/oauth2/authorization/google");
  };

  useEffect(() => {
    //로그인 여부 확인
    async function waitForSecond() {
      await wait(3000);
      setIsUserLoggedIn(false);
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

  let opacity = new Animated.Value(0);

  // useEffect(() => {
  //   let getCookies = () =>
  //     CookieManager.getAll(useWebKit).then(cookies => {
  //       console.log("CookieManager.get =>", cookies);
  //     });
  //   if (Platform.OS === "android") {
  //     getCookies = () =>
  //       CookieManager.get("https://linkedin.com").then(cookies => {
  //         console.log("CookieManager.get =>", cookies);
  //       });
  //   }
  //   getCookies();
  // }, []);

  let webViewRef = createRef<WebView>();

  // const CHECK_COOKIE: string = ReactNativeWebView.postMessage(
  //   "Cookie: " + document.cookie,
  // );
  // true;
  const onNavigationStateChange = async (
    navigationState: WebViewNavigation,
  ) => {
    // console.log(navigationState);
    // CookieManager.getAll(true).then(res => {
    //   // console.log(res.ACCOUNT_CHOOSER);
    //   console.log(res);
    // });
    const cookies = await CookieManager.get("http://localhost:8080");
    console.log(cookies.JSESSIONID.value);
    // if (webViewRef.current) {
    //   console.log("onNavigationStateChange");
    //   // webViewRef.current.injectJavaScript("Data from React Native App");

    // }
  };

  // const onMessage = (event: NativeSyntheticEvent<WebViewMessage>) => {
  //   const { data } = event.nativeEvent;
  //   console.log("onMessage");

  //   if (data.includes("Cookie:")) {
  //     //
  //   }
  // };

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
            <TouchableOpacity onPress={signInWithGoogle}>
              <Image
                source={require("../assets/icons/google_icon.png")}
                style={styles.iconStyle}></Image>
            </TouchableOpacity>

            <TouchableOpacity onPress={signInWithKakao}>
              <Image
                source={require("../assets/icons/kakao_icon.png")}
                style={styles.iconStyle}></Image>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={socialModalVisible}>
        <WebView
          ref={webViewRef}
          cacheEnabled={false}
          // onLoad={() => {
          //   console.log(
          //     webViewRef.postMessage("전송 데이터(React) : 웹으로 데이터 전송"),
          //   );
          // }}
          // originWhitelist={["*"]}
          source={{ uri: NAVER_SOCIAL_LOGIN_URI }}
          userAgent={userAgent}
          // WebView 로딩이 시작되거나 끝나면 호출해주는 것
          onNavigationStateChange={onNavigationStateChange}
          // onMessage={onMessage}
          onMessage={evt => {
            console.log("받은 데이터: " + evt);
          }}
          // userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
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
    marginHorizontal: verticalScale(12.5),
  },
});
