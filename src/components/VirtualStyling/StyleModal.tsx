import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Button } from "@rneui/themed";
import { verticalScale } from "../../utils/scale";
import HairColorItem from "./HairColorItem";
import Header from "../Header";

import { TouchableWithoutFeedback } from "react-native";
export default function StyleModal(props) {
  return (
    <Modal
      isVisible={props.isHairModalVisible}
      style={{ margin: 0, justifyContent: "flex-end" }}
      onBackdropPress={props.toggleHairModal}>
      <View
        style={{
          height: "55%",
          backgroundColor: "blue",
          borderRadius: 30,
        }}>
        <View></View>
      </View>
      {/* <View style={{ flex: 1, backgroundColor: "green" }}></View>
        <View style={{ flex: 2, backgroundColor: "yellow" }}></View> */}

      {/* <View style={{ flex: 4 }}></View> */}
      {/* <View
        style={{
          flex: 3,
          backgroundColor: "red",
          borderTopEndRadius: 30,
          borderTopLeftRadius: 30,
          paddingTop: verticalScale(40),
        }}>
        <Button title="Hide modal" onPress={props.toggleHairModal} />
        <Button title="Hide modal" onPress={props.toggleHairModal} />
        <Button title="Hide modal" onPress={props.toggleHairModal} />
      </View> */}
      {/* <Button title="Hide modal" onPress={props.toggleHairModal} /> */}
    </Modal>
  );
}

const styles = StyleSheet.create({});
