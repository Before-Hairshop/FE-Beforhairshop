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
import CustomerList from "../screens/CustomerList";
import Suggestion from "../screens/Suggestion";
import DesignerRegistration from "../screens/DesignerRegistration";
import Review from "../screens/Review";
import Answer from "../screens/Answer";
import ChatList from "../screens/ChatList";
import NewMain from "../screens/NewMain";
import Mypage from "../screens/MyPage";
import RecommendList from "../screens/RecommendList";
import KakaoSocialLogin from "../screens/KakaoSocialLogin";
import AppleSocialLogin from "../screens/AppleSocialLogin";
import DesignerModify from "../screens/DesignerModify";
import UserProfileModify from "../screens/UserProfileModify";
import ReviewModify from "../screens/ReviewModify";
import NewRecommendList from "../screens/NewRecommendList";
import ServiceCenter from "../screens/ServiceCenter";

const mainStack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <mainStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Loading">
      <mainStack.Screen
        name="Loading"
        component={Loading}
        options={{ gestureEnabled: false }}
      />
      <mainStack.Screen
        name="NewMain"
        component={NewMain}
        options={{ gestureEnabled: false }}
      />
      <mainStack.Screen
        name="ServiceTerms"
        component={ServiceTerms}
        options={{ gestureEnabled: false }}
      />
      <mainStack.Screen
        name="Location"
        component={Location}
        options={{ gestureEnabled: false }}
      />
      <mainStack.Screen name="DesignerProfile" component={DesignerProfile} />
      <mainStack.Screen name="DesignerList" component={DesignerList} />
      <mainStack.Screen name="Map" component={Map} />
      <mainStack.Screen name="UserCheck" component={UserCheck} />
      <mainStack.Screen name="UserProfile" component={UserProfile} />
      <mainStack.Screen name="Answer" component={Answer} />
      <mainStack.Screen name="CustomerList" component={CustomerList} />
      <mainStack.Screen name="ChatList" component={ChatList} />
      <mainStack.Screen name="Suggestion" component={Suggestion} />
      <mainStack.Screen name="Review" component={Review} />
      <mainStack.Screen name="Mypage" component={Mypage} />
      <mainStack.Screen name="RecommendList" component={RecommendList} />
      <mainStack.Screen name="KakaoSocialLogin" component={KakaoSocialLogin} />
      <mainStack.Screen name="AppleSocialLogin" component={AppleSocialLogin} />
      <mainStack.Screen name="DesignerModify" component={DesignerModify} />
      <mainStack.Screen name="ReviewModify" component={ReviewModify} />
      <mainStack.Screen name="NewRecommendList" component={NewRecommendList} />
      <mainStack.Screen name="ServiceCenter" component={ServiceCenter} />
      <mainStack.Screen
        name="UserProfileModify"
        component={UserProfileModify}
      />
      <mainStack.Screen
        name="UserProfileLookup"
        component={UserProfileLookup}
      />
      <mainStack.Screen
        name="DesignerRegistration"
        component={DesignerRegistration}
      />
      {/* <mainStack.Screen name="Main" component={Main} /> */}
      {/* <mainStack.Screen name="VirtualStyling" component={VirtualStyling} /> */}
      {/* <mainStack.Screen name="ProfileSelection" component={ProfileSelection} /> */}
    </mainStack.Navigator>
  );
};
