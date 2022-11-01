import React, { useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./src/navigation/RootNavigator";

import { createStore, applyMiddleware, compose } from "redux";

import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

import reducers from "./src/store/reducers";
import messaging from "@react-native-firebase/messaging";
import pushNoti from "./src/utils/pushNoti";

const createStoreWithMiddleware = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promiseMiddleware)),
);

export default function App() {
  const foregroundListener = useCallback(() => {
    messaging().onMessage(async message => {
      console.log(message);
      pushNoti.displayNoti(message);
    });
  }, []);

  useEffect(() => {
    foregroundListener();
  }, []);

  return (
    <Provider store={createStoreWithMiddleware}>
      <NavigationContainer>
        <RootNavigator></RootNavigator>
      </NavigationContainer>
    </Provider>
  );
}
