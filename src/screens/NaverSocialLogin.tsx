// import {
//   Button,
//   Platform,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import React, { useState } from "react";

// import { ConfigParam, NaverLogin } from "@react-native-seoul/naver-login";

// const iosKeys = {
//   kConsumerKey: "VC5CPfjRigclJV_TFACU",
//   kConsumerSecret: "f7tLFw0AHn",
//   kServiceAppName: "테스트앱(iOS)",
//   kServiceAppUrlScheme: "testapp", // only for iOS
// };

// const androidKeys = {
//   kConsumerKey: "QfXNXVO8RnqfbPS9x0LR",
//   kConsumerSecret: "6ZGEYZabM9",
//   kServiceAppName: "테스트앱(안드로이드)",
// };

// const initials = Platform.OS === "ios" ? iosKeys : androidKeys;

// export default function NaverSocialLogin() {
//   const [naverToken, setNaverToken] = useState(null);

//   const naverLogin = (props: any) => {
//     return new Promise((resolve, reject) => {
//       NaverLogin.login(props, (err, token) => {
//         console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
//         setNaverToken(token);
//         if (err) {
//           reject(err);
//           return;
//         }
//         resolve(token);
//       });
//     });
//   };

//   const naverLogout = () => {
//     NaverLogin.logout();
//     setNaverToken("");
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Button
//         title="네이버 아이디로 로그인하기"
//         onPress={() => naverLogin(initials)}
//       />
//       {!!naverToken && <Button title="로그아웃하기" onPress={naverLogout} />}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "space-evenly",
//     alignItems: "center",
//   },
// });
