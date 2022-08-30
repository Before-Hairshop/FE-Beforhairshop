import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

import Main from "../screens/Main";
import VirtualStyling from "../screens/VirtualStyling";
import ProfileSelection from "../screens/ProfileSelection";
import Header from "../components/Header";
import DesignerProfile from "../screens/DesignerProfile";

import Loading from "../screens/Loading";

const mainStack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <mainStack.Navigator screenOptions={{ headerShown: false }}>
      <mainStack.Screen name="Loading" component={Loading} />
      <mainStack.Screen name="Main" component={Main} />
      <mainStack.Screen name="VirtualStyling" component={VirtualStyling} />
      <mainStack.Screen name="DesignerProfile" component={DesignerProfile} />
      <mainStack.Screen name="ProfileSelection" component={ProfileSelection} />
    </mainStack.Navigator>
  );
};
