import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import React from 'react';

export default function Loading(props) {
  return (
    <View>
      <TouchableOpacity onPress={() => props.navigation.push('VirtualStyling')}>
        <Text>Main</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
