import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from "../screens/Main";
import VirtualStyling from "../screens/VirtualStyling";
import ProfileSelection from "../screens/ProfileSelection";
import DesignerProfile from "../screens/DesignerProfile";
import DesignerList from "../screens/DesignerList";
import Map from "../screens/Map";
import UserProfileLookup from "../screens/UserProfileLookup";
import UserProfile from "../screens/UserProfile";

import Loading from "../screens/Loading";
import ServiceTerms from "../screens/ServiceTerms";
import UserCheck from "../screens/UserCheck";
import Location from "../screens/Location";
import Loading2 from "../screens/Loading2";

const mainStack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <mainStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Loading">
      <mainStack.Screen name="Loading" component={Loading} />
      <mainStack.Screen name="Loading2" component={Loading2} />
      <mainStack.Screen name="Main" component={Main} />
      <mainStack.Screen name="VirtualStyling" component={VirtualStyling} />
      <mainStack.Screen name="DesignerProfile" component={DesignerProfile} />
      <mainStack.Screen name="ProfileSelection" component={ProfileSelection} />
      <mainStack.Screen name="DesignerList" component={DesignerList} />
      <mainStack.Screen name="Map" component={Map} />
      <mainStack.Screen name="ServiceTerms" component={ServiceTerms} />
      <mainStack.Screen name="UserCheck" component={UserCheck} />
      <mainStack.Screen name="UserProfile" component={UserProfile} />
      <mainStack.Screen name="Location" component={Location} />
      <mainStack.Screen
        name="UserProfileLookup"
        component={UserProfileLookup}
      />
    </mainStack.Navigator>
  );
};
