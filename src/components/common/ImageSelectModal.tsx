import { Modal, SafeAreaView, Text } from "react-native";
import React from "react";

import CloseIcon from "../../assets/icons/close.svg";
import { verticalScale } from "../../utils/scale";

export default function ImageSelectModal(props) {
  return (
    <Modal visible={props.visible} transparent={true}>
      <SafeAreaView
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#0c0c0c",
        }}>
        <Text>modal!!!</Text>
      </SafeAreaView>
    </Modal>
  );
}
