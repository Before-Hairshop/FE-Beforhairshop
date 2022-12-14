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
import NewProfileSelection from "../screens/NewProfileSelection";
import NewVirtualStyling from "../screens/NewVirtualStyling";
import AllDesignerList from "../screens/AllDesignerList";
import OnlyDesignerProfile from "../screens/OnlyDesignerProfile";
import ProfileRegistration from "../screens/ProfileRegistration";
import VirtualServiceCenter from "../screens/VirtualServiceCenter";

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
      <mainStack.Screen name="VirtualStyling" component={VirtualStyling} />
      <mainStack.Screen name="ProfileSelection" component={ProfileSelection} />
      <mainStack.Screen name="AllDesignerList" component={AllDesignerList} />
      <mainStack.Screen
        name="NewVirtualStyling"
        component={NewVirtualStyling}
      />
      <mainStack.Screen
        name="NewProfileSelection"
        component={NewProfileSelection}
      />
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
      <mainStack.Screen
        name="OnlyDesignerProfile"
        component={OnlyDesignerProfile}
      />
      <mainStack.Screen
        name="ProfileRegistration"
        component={ProfileRegistration}
      />
      <mainStack.Screen
        name="VirtualServiceCenter"
        component={VirtualServiceCenter}
      />
      {/* <mainStack.Screen name="Main" component={Main} /> */}
    </mainStack.Navigator>
  );
};
