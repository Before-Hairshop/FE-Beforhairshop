import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Geolocation from "react-native-geolocation-service";
import NaverMapView, { Marker } from "react-native-nmap";

import { scale, verticalScale } from "../utils/scale";
import LocationHeader from "../components/location/LocationHeader";
import { getReverseGeocoding } from "../api/getReverseGeocoding";

const { width, height } = Dimensions.get("window");

export default function Location() {
  const [zoomSize, setZoomSize] = useState(14);
  const [coords, setCoords] = useState({
    latitude: 37.56661020000001,
    longitude: 126.97838810000002,
  });
  const [address, setAddress] = useState([]);
  const [addressDetail, setAddressDetail] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    async function fetchAddress() {
      const { results } = await getReverseGeocoding(
        `${coords.longitude},${coords.latitude}`,
      );
      // await setAddress([]);
      // await setAddressDetail([]);
      if (results[0] === undefined) {
        setAddress(["잘못된 위치"]);
        setAddressDetail(["다른 지점을 선택해주세요"]);
      } else {
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
      }
    }
    fetchAddress();
  }, [coords]);

  useEffect(() => {
    async function setCurrentLocation() {
      if (Platform.OS === "ios") {
        // Geolocation.requestAuthorization();
        // Geolocation.setRNConfiguration({
        //   skipPermissionRequests: false,
        //   authorizationLevel: "whenInUse",
        // });
        // const auth = await Geolocation.requestAuthorization("always");
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }

      if (Platform.OS === "android") {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setCoords(prev => ({
              ...prev,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }));
          },
          error => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    }
    setCurrentLocation();
  }, []);

  return (
    <View style={styles.frame}>
      <LocationHeader />
      <View style={styles.map_section}>
        <NaverMapView
          style={{ width: "100%", height: "100%" }}
          showsMyLocationButton={true}
          center={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            zoom: zoomSize,
          }}
          // onZoomChanged={e => {
          //   console.log(e);
          //   // setZoomSize()
          // }}
          onCameraChange={e => {
            console.log(e);
            setCoords({
              latitude: e.latitude,
              longitude: e.longitude,
            });
            setZoomSize(e.zoom);
          }}
          // onMapClick={e => console.warn("onMapClick", JSON.stringify(e))}
          useTextureView>
          <Marker
            coordinate={coords}
            // onClick={() => console.warn("onClick! p0")}
            // caption={{ text: "test caption", align: Align.Top }}
          />
        </NaverMapView>
      </View>
      <View style={styles.address_section}>
        <View style={styles.info_container}>
          <Text style={styles.info_text}>도로명</Text>
        </View>
        <Text style={styles.address_text}>{address.join(" ")}</Text>
        <Text style={styles.detail_address_text}>
          {addressDetail.join(" ")}
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
