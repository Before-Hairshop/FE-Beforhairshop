/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import "react-native-get-random-values";
import messaging from "@react-native-firebase/messaging";
import pushNoti from "./src/utils/pushNoti";
import "react-native-gesture-handler";

// Register background handler
messaging().setBackgroundMessageHandler(async message => {
  pushNoti.displayNoti(message);
});

AppRegistry.registerComponent(appName, () => App);
