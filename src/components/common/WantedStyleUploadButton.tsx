import { StyleSheet, Text, View, Image, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import PlusIcon from "../../assets/icons/plus.png";
const baseImageURL = Image.resolveAssetSource(PlusIcon).uri;

import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { resizeImage } from "../../utils/resizeImage";
import { verticalScale } from "../../utils/scale";
import CameraIcon from "../../assets/icons/common/camera.png";
import GalleryIcon from "../../assets/icons/common/gallery.png";

export default function WantedStyleUploadButton(props) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Modal visible={visible} transparent={true}>
        <Pressable
          style={{
            backgroundColor: "rgba(12, 12, 12, 0.8)",
            width: "100%",
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
          onPress={() => {
            setVisible(false);
          }}>
          <TouchableOpacity
            style={{
              width: "35%",
              height: verticalScale(70),
              borderRadius: 10,
              backgroundColor: "#2e2e2e",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
            onPress={async () => {
              setVisible(false);
              const result = await launchCamera({
                cameraType: "front",
                presentationStyle: "fullScreen",
                maxWidth: 1024,
                maxHeight: 1024,
              });
              const resize_result = await resizeImage(result.assets[0].uri);
              console.log(resize_result);
              let newArray = [...props.array];
              // const res = await fetch(result.assets[0].uri);
              // const blob = await res.blob();
              const res = await fetch(resize_result.uri);
              const blob = await res.blob();
              newArray.push({
                // uri: result.assets[0].uri,
                uri: resize_result.uri,
                blob: blob,
              });
              props.setArray(newArray);
            }}>
            <Image
              source={CameraIcon}
              style={{ width: verticalScale(20), height: verticalScale(20) }}
            />
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: verticalScale(14),
                fontWeight: "500",
                fontStyle: "normal",
                textAlign: "center",
                color: "#a0a0a0",
              }}>
              {"  "}
              사진 촬영
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "35%",
              height: verticalScale(70),
              borderRadius: 10,
              backgroundColor: "#2e2e2e",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
            onPress={async () => {
              setVisible(false);
              const result = await launchImageLibrary();
              const resize_result = await resizeImage(result.assets[0].uri);
              console.log(resize_result);
              let newArray = [...props.array];
              // const res = await fetch(result.assets[0].uri);
              // const blob = await res.blob();
              const res = await fetch(resize_result.uri);
              const blob = await res.blob();
              newArray.push({
                // uri: result.assets[0].uri,
                uri: resize_result.uri,
                blob: blob,
              });
              props.setArray(newArray);
            }}>
            <Image
              source={GalleryIcon}
              style={{ width: verticalScale(20), height: verticalScale(20) }}
            />
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: verticalScale(14),
                fontWeight: "500",
                fontStyle: "normal",
                textAlign: "center",
                color: "#a0a0a0",
              }}>
              {"  "}
              앨범 선택
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Modal>
      <TouchableOpacity
        style={props.style}
        onPress={async () => {
          setVisible(true);
          // console.log(props);
          // const result = await launchImageLibrary();
          // const resize_result = await resizeImage(result.assets[0].uri);
          // console.log(resize_result);
          // let newArray = [...props.array];
          // // const res = await fetch(result.assets[0].uri);
          // // const blob = await res.blob();
          // const res = await fetch(resize_result.uri);
          // const blob = await res.blob();
          // newArray.push({
          //   // uri: result.assets[0].uri,
          //   uri: resize_result.uri,
          //   blob: blob,
          // });
          // props.setArray(newArray);
        }}>
        <Image
          source={{ uri: baseImageURL }}
          style={{ width: "100%", aspectRatio: 1 }}
        />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({});
