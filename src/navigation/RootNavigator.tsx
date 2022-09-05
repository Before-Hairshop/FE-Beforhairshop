import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from "../screens/Main";
import VirtualStyling from "../screens/VirtualStyling";
import ProfileSelection from "../screens/ProfileSelection";
import DesignerProfile from "../screens/DesignerProfile";
import DesignerList from "../screens/DesignerList";
import Map from "../screens/Map";
import Loading from "../screens/Loading";
import ServiceTerms from "../screens/ServiceTerms";
import UserCheck from "../screens/UserCheck";

const mainStack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <mainStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="UserCheck">
      <mainStack.Screen name="Loading" component={Loading} />
      <mainStack.Screen name="Main" component={Main} />
      <mainStack.Screen name="VirtualStyling" component={VirtualStyling} />
      <mainStack.Screen name="DesignerProfile" component={DesignerProfile} />
      <mainStack.Screen name="ProfileSelection" component={ProfileSelection} />
      <mainStack.Screen name="DesignerList" component={DesignerList} />
      <mainStack.Screen name="Map" component={Map} />
      <mainStack.Screen name="ServiceTerms" component={ServiceTerms} />
      <mainStack.Screen name="UserCheck" component={UserCheck} />
    </mainStack.Navigator>
  );
};
