import { View, Modal, SafeAreaView, Image, Pressable } from "react-native";
import React from "react";

// import CloseIcon from "../../assets/icons/close.png";
import CloseIcon from "../../assets/icons/close.svg";
import { verticalScale } from "../../utils/scale";

export default function ImageModal(props) {
  return (
    <Modal visible={props.uri == null ? false : true} transparent={true}>
      <SafeAreaView
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#0c0c0c",
        }}>
        <View>
          <Image
            source={{
              uri: props.uri + "?" + new Date(),
            }}
            style={{
              resizeMode: "contain",
              width: "100%",
              height: "100%",
            }}
          />
          <Pressable
            onPress={() => {
              props.setUri(null);
            }}
            style={{
              padding: verticalScale(5),
              position: "absolute",
            }}>
            <CloseIcon width={verticalScale(30)} height={verticalScale(30)} />
            {/* <Image
              resizeMode="contain"
              source={CloseIcon}
              style={{
                width: verticalScale(35),
                height: verticalScale(35),
              }}
            /> */}
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
