import React from "react";
import { Modal, Platform, StyleSheet } from "react-native";

import { scale, verticalScale } from "../../utils/scale";
import Postcode from "./Postcode";

export default function PostcodeModal(props) {
  return (
    <Modal visible={props.postcodeModal}>
      <Postcode
        style={{
          width: "100%",
          height: "100%",
          paddingTop:
            Platform.OS === "ios" ? verticalScale(40) : verticalScale(0),
        }}
        jsOptions={{ animation: true, hideMapBtn: true }}
        onSelected={data => {
          console.log(data);
          props.setPostcodeModal(false);
          props.setLocation(data.address);
          props.setZipCode(data.zonecode);
        }}
        onError={function (error): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({});
