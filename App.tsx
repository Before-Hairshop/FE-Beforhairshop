import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./src/navigation/RootNavigator";

import { createStore, applyMiddleware, compose } from "redux";

import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

import reducers from "./src/store/reducers";

const createStoreWithMiddleware = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promiseMiddleware)),
);

export default function App() {
  return (
    <Provider store={createStoreWithMiddleware}>
      <NavigationContainer>
        <RootNavigator></RootNavigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
