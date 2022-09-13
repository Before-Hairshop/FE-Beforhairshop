import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { scale, verticalScale } from "../utils/scale";
import GoBackIcon from "../assets/icons/goBack.svg";
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
  Align,
} from "../components/map";

const { width, height } = Dimensions.get("window");

const Header = () => (
  <View
    style={{
      marginTop: Platform.OS === "ios" ? verticalScale(40) : verticalScale(0),
      height: verticalScale(70),
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: verticalScale(15),
      paddingBottom: verticalScale(15),
      paddingLeft: verticalScale(8),
      paddingRight: verticalScale(8),
    }}>
    <TouchableOpacity
      style={{
        width: scale(40),
        height: verticalScale(40),
        alignItems: "center",
        justifyContent: "center",
      }}>
      <GoBackIcon />
    </TouchableOpacity>
    <View style={{ height: "100%", justifyContent: "center" }}>
      <Text
        style={{
          fontFamily: "Pretendard",
          fontSize: 18,
          fontWeight: "600",
          fontStyle: "normal",
          letterSpacing: 0,
          textAlign: "center",
          color: "#ffffff",
        }}>
        지도에서 위치 확인
      </Text>
    </View>
    <View style={{ width: scale(40), height: verticalScale(40) }} />
  </View>
);

export default function Location() {
  const [location, setLocation] = useState({
    latitude: 37.564362,
    longitude: 126.977011,
  });

  const navigation = useNavigation();

  return (
    <View style={styles.frame}>
      <Header />
      <View style={styles.map_section}>
        <NaverMapView
          style={{ width: "100%", height: "100%" }}
          showsMyLocationButton={true}
          center={{
            ...{ latitude: 37.564362, longitude: 126.977011 },
            zoom: 16,
          }}
          // onTouch={e => console.log("onTouch", JSON.stringify(e.nativeEvent))}
          // onTouch={e => console.log("onTouch", e)}
          onCameraChange={e => {
            // console.log(typeof e);
            setLocation(current => {
              let newCondition = { ...current };
              newCondition["latitude"] = e.latitude;
              newCondition["longitude"] = e.longitude;
              console.log(e.latitude);
              console.log(e.longitude);
              return newCondition;
            });
          }}
          // onMapClick={e => console.warn("onMapClick", JSON.stringify(e))}
          useTextureView>
          <Marker
            coordinate={location}
            // onClick={() => console.warn("onClick! p0")}
            // caption={{ text: "test caption", align: Align.Top }}
          />
        </NaverMapView>
      </View>
      <View style={styles.address_section}>
        <View style={styles.info_container}>
          <Text style={styles.info_text}>도로명</Text>
        </View>
        <Text style={styles.address_text}>
          서울특별시 광진구 능동로 42길 33 2501호
        </Text>
        <Text style={styles.detail_address_text}>능동로 42길 33 2501호</Text>
        <TouchableOpacity style={styles.button_container}>
          <Text style={styles.button_text}>이 위치로 주소 설정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: width,
    height: height,
    backgroundColor: "#191919",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  map_section: {
    backgroundColor: "black",
    height: verticalScale(464),
  },
  address_section: {
    width: "100%",
    paddingTop: verticalScale(30),
    paddingRight: scale(20),
    paddingBottom: verticalScale(44),
    paddingLeft: scale(20),
  },
  info_container: {
    width: scale(44),
    height: verticalScale(19),
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#fc2a5b",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  info_text: {
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    textAlign: "left",
    color: "#fc2a5b",
  },
  address_text: {
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    textAlign: "left",
    color: "#888888",
    marginTop: verticalScale(10.5),
  },
  detail_address_text: {
    fontFamily: "Pretendard",
    fontSize: 18,
    fontWeight: "500",
    fontStyle: "normal",
    textAlign: "left",
    color: "#ffffff",
    marginTop: verticalScale(9),
  },
  button_container: {
    width: "100%",
    height: verticalScale(55),
    backgroundColor: "#fc2a5b",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(30.5),
  },
  button_text: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: -0.16,
    color: "#ffffff",
  },
});
