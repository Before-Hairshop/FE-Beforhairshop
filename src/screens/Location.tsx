import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { scale, verticalScale } from "../utils/scale";
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
  Align,
} from "../components/map";
import LocationHeader from "../components/location/LocationHeader";
import { getReverseGeocoding } from "../api/getReverseGeocoding";

const { width, height } = Dimensions.get("window");

export default function Location() {
  const [location, setLocation] = useState({
    latitude: 37.564362,
    longitude: 126.977011,
  });
  const [address, setAddress] = useState([]);
  const [addressDetail, setAddressDetail] = useState([]);

  const navigation = useNavigation();

  const setUpAddress = async (longitude: number, latitude: number) => {
    const { results } = await getReverseGeocoding(`${longitude},${latitude}`);
    console.log(results[0]);
    setAddress([]);
    setAddressDetail([]);
    setAddress([
      results[0].region.area1.name,
      results[0].region.area2.name,
      results[0].region.area3.name,
      results[0].region.area4.name,
    ]);
    setAddressDetail([
      results[0].land.name,
      results[0].land.number1,
      results[0].land.number2,
    ]);
  };

  return (
    <View style={styles.frame}>
      <LocationHeader />
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
            setLocation(current => {
              let newCondition = { ...current };
              newCondition["latitude"] = e.latitude;
              newCondition["longitude"] = e.longitude;
              console.log(e.latitude);
              console.log(e.longitude);
              return newCondition;
            });
            setUpAddress(e.longitude, e.latitude);
            console.log(address);
            console.log(addressDetail);
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
          {/* 서울특별시 광진구 능동로 42길 33 2501호 */}
          {address}
        </Text>
        <Text style={styles.detail_address_text}>
          {/* 능동로 42길 33 2501호 */}
          {addressDetail}
        </Text>
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
