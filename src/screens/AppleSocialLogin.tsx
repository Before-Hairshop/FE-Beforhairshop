import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
// import appleAuth, {
//   AppleButton,
//   AppleAuthRequestOperation,
//   AppleAuthRequestScope,
//   AppleAuthCredentialState,
//   appleAuthAndroid,
// } from "@invertase/react-native-apple-authentication";
import appleAuth, {
  AppleButton,
  appleAuthAndroid,
} from "@invertase/react-native-apple-authentication";

// async function onAppleButtonPress() {
//   // performs login request
//   const appleAuthRequestResponse = await appleAuth.performRequest({
//     requestedOperation: AppleAuthRequestOperation.LOGIN,
//     requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
//   });

//   // get current authentication state for user
//   // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
//   const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

//   // use credentialState response to ensure the user is authenticated
//   if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
//     // user is authenticated
//   }
// }

export default function AppleSocialLogin() {
  async function onIOSAppleButtonPress() {
    console.log("ios apple login");
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
    }
  }

  async function onAndroidAppleButtonPress() {
    console.log("android apple login");
    // Generate secure, random values for state and nonce
    const rawNonce = uuid();
    const state = uuid();

    // Configure the request
    appleAuthAndroid.configure({
      // The Service ID you registered with Apple
      clientId: "com.bh.prod",
      // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
      // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
      redirectUri: "https://example.com/auth/callback",
      // The type of response requested - code, id_token, or both.
      responseType: appleAuthAndroid.ResponseType.ALL,
      // The amount of user information requested from Apple.
      scope: appleAuthAndroid.Scope.ALL,
      // Random nonce value that will be SHA256 hashed before sending to Apple.
      nonce: rawNonce,
      // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
      state,
    });

    // Open the browser window for user sign in
    const response = await appleAuthAndroid.signIn();
    console.log(response);
    // Send the authorization code to your backend for verification
  }

  // useEffect(() => {
  //   appleAuth.onCredentialRevoked(async () => {
  //     console.warn(
  //       "If this function executes, User Credentials have been Revoked",
  //     );
  //   });
  // }, []);

  async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    console.log("appleAuthRequestResponse", appleAuthRequestResponse);

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    console.log("credentialState", credentialState);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      console.log("apple login");
      // user is authenticated
    }
  }

  return (
    <SafeAreaView>
      <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 160, // You must specify a width
          height: 45, // You must specify a height
        }}
        onPress={() => {
          if (Platform.OS === "ios") {
            onAppleButtonPress();
          } else {
            onAndroidAppleButtonPress();
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
