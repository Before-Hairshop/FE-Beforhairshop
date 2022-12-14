import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import { scale, verticalScale } from "../utils/scale";
import { getMemberInfo } from "../api/getMemberInfo";
import { readData, removeData, storeData } from "../utils/asyncStorage";
import GoogleLoginIcon from "../components/loading/GoogleLoginIcon";
import KakaoLoginIcon from "../components/loading/KakaoLoginIcon";
import NaverLoginIcon from "../components/loading/NaverLoginIcon";
import AppleLoginIcon from "../components/loading/AppleLoginIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASEURL } from "../api/baseUrl";
import appleAuth, {
  AppleButton,
  appleAuthAndroid,
} from "@invertase/react-native-apple-authentication";
import {
  login,
  logout,
  getProfile as getKakaoProfile,
  unlink,
  loginWithKakaoAccount,
} from "@react-native-seoul/kakao-login";
import { postKakaoLogin } from "../api/postKakaoLogin";
import { getMemberSession } from "../api/getMemberSession";
import { postAppleLogin } from "../api/postAppleLogin";
import AppLogo from "../assets/icons/BeforeHairshopLogo.png";
import messaging from "@react-native-firebase/messaging";
import Spinner from "../components/common/Spinner";

const wait = (timeToDelay: number) => {
  return new Promise(resolve => setTimeout(resolve, timeToDelay));
};

const opacity = new Animated.Value(0);

export default function Loading({ route }) {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  // const isFocused = useIsFocused();

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await loginWithKakaoAccount();
      setLoading(true);
      console.log(token);
      const profile = await getKakaoProfile();
      console.log(profile);

      const enabled = await messaging().hasPermission();
      console.log("permission", enabled);
      // if (enabled == -1) {
      const authorized = await messaging().requestPermission();
      console.log("authorized", authorized);
      // if (authorized == 1) {
      const fcmToken = await messaging().getToken();
      console.log("fcmToken", fcmToken);
      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        messaging().registerDeviceForRemoteMessages();
      }

      const result = await postKakaoLogin(
        profile.id,
        profile.email,
        token.accessToken,
        fcmToken,
      );
      // setRes(res.concat(result.toString()));
      // Alert.alert(result);
      console.log(result);
      setLoading(false);
      if (result.data.result.status == 0) {
        navigation.navigate("ServiceTerms");
      } else {
        storeData("@DESIGNER_FLAG", String(result.data.result.designerFlag));
        navigation.reset({
          routes: [
            {
              name: "NewMain",
              params: { reload: true },
            },
          ],
        });
        // navigation.navigate("NewMain");
      }

      // console.log(result.headers["set-cookie"]);

      // const cookies = await CookieManager.get(`${BASEURL}#`);
      // console.log(cookies);
      // storeData("@SESSION_ID", cookies.SESSION.value);
      // // setSocialLoginModalVisible(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("login err", err);
    }
  };

  async function signInWithApple() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    setLoading(true);
    console.log("appleAuthRequestResponse", appleAuthRequestResponse);
    console.log(
      appleAuthRequestResponse.user,
      appleAuthRequestResponse.email,
      appleAuthRequestResponse.identityToken,
    );

    const enabled = await messaging().hasPermission();
    console.log("permission", enabled);
    // if (enabled == -1) {
    const authorized = await messaging().requestPermission();
    console.log("authorized", authorized);
    // if (authorized == 1) {
    const fcmToken = await messaging().getToken();
    console.log("fcmToken", fcmToken);
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      messaging().registerDeviceForRemoteMessages();
    }

    const result = await postAppleLogin(
      appleAuthRequestResponse.user,
      appleAuthRequestResponse.email,
      appleAuthRequestResponse.identityToken,
      fcmToken,
    );
    console.log(result);

    setLoading(false);

    if (result.data.result.status == 0) {
      navigation.navigate("ServiceTerms");
    } else {
      storeData("@DESIGNER_FLAG", String(result.data.result.designerFlag));
      navigation.reset({
        routes: [
          {
            name: "NewMain",
            params: { reload: true },
          },
        ],
      });
      // navigation.navigate("NewMain");
    }

    // // get current authentication state for user
    // // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    // const credentialState = await appleAuth.getCredentialStateForUser(
    //   appleAuthRequestResponse.user,
    // );
    // console.log("credentialState", credentialState);
    // console.log("appleAuth", appleAuth.State.AUTHORIZED);

    // // use credentialState response to ensure the user is authenticated
    // if (credentialState === appleAuth.State.AUTHORIZED) {
    //   console.log("apple login");
    //   // user is authenticated
    // }
  }

  const signIn = async (type: string) => {
    if (type == "kakao") {
      signInWithKakao();
    } else if (type == "apple") {
      signInWithApple();
    }
    //     else {
    // await setLoginType(type);
    // setSocialLoginModalVisible(true);
    // }
  };

  const callAPI = async () => {
    try {
      const result = await getMemberSession();
      console.log(result);
      if (result.data.status == "NOT_FOUND") {
        console.log("session not found");
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      } else {
        console.log("yes session");
        if (result.data.result.status == 0) {
          navigation.navigate("ServiceTerms");
        } else {
          await storeData(
            "@DESIGNER_FLAG",
            String(result.data.result.designerFlag),
          );
          navigation.reset({
            routes: [
              {
                name: "NewMain",
                params: { reload: true },
              },
            ],
          });
          // navigation.navigate("NewMain");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("loading page");
    async function waitForSecond() {
      await wait(1500);
      await callAPI();
    }
    waitForSecond();
  }, [route]);

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
                outputRange: [0, verticalScale(100)],
              }),
            },
          ]}>
          <Image
            style={{ width: verticalScale(250), height: verticalScale(250) }}
            source={AppLogo}
          />
          {/* <Text style={styles.mainText}>BEFORE</Text>
          <Text style={styles.mainText}>HAIRSHOP</Text> */}
        </Animated.View>
      </View>
      <View style={styles.icon_animation_container}>
        <Animated.View
          style={{
            opacity: opacity,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text style={styles.subText}>SNS ???????????? ?????????????????? </Text>
          <View style={{ flexDirection: "row", margin: verticalScale(23) }}>
            {/* <TouchableOpacity onPress={() => signIn("google")}>
              <GoogleLoginIcon />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => signIn("kakao")}>
              <KakaoLoginIcon />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => signIn("naver")}>
              <NaverLoginIcon />
            </TouchableOpacity> */}
            {Platform.OS == "ios" && (
              <TouchableOpacity onPress={() => signIn("apple")}>
                <AppleLoginIcon />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </View>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={socialLoginModalVisible}>
        <SafeAreaView style={{ flex: 1 }}>
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
        </SafeAreaView>
      </Modal> */}
      {loading && <Spinner />}
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
