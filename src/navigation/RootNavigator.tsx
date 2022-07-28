import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from '../screens/Main';
import VirtualStyling from '../screens/VirtualStyling';

const mainStack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <mainStack.Navigator screenOptions={{headerShown: false}}>
      <mainStack.Screen name="Main" component={Main} />
      <mainStack.Screen name="VirtualStyling" component={VirtualStyling} />
    </mainStack.Navigator>
  );
};
