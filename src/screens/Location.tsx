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
import { patchUserLocation } from "../api/patchUserLocation";

const { width, height } = Dimensions.get("window");

export default function Location() {
  const [zoomSize, setZoomSize] = useState(14);
  const [coords, setCoords] = useState({
    latitude: 37.56661020000001,
    longitude: 126.97838810000002,
  });
  const [zipCode, setZipCode] = useState(undefined);
  const [address, setAddress] = useState([]);
  const [addressDetail, setAddressDetail] = useState([]);

  const navigation = useNavigation();

  async function requestPermissionIOS() {
    try {
      return await Geolocation.requestAuthorization("whenInUse");
    } catch (error) {
      console.log(error);
    }
  }

  async function requestPermissionANDROID() {
    try {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function finishSetting(zip: any, addr: any, lati: any, longi: any) {
    console.log(zip);
    console.log(addr);
    console.log(lati);
    console.log(longi);
    if (zip != undefined) {
      const response = await patchUserLocation(zip, addr, lati, longi);
      console.log(response);
      navigation.navigate("NewMain");
    }
  }

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
        setZipCode(undefined);
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
        setZipCode(results[0].land.addition1.value);
      }
    }
    fetchAddress();
  }, [coords]);

  useEffect(() => {
    function setCurrentLocation() {
      if (Platform.OS === "ios") {
        requestPermissionIOS().then(result => {
          if (result === "granted") {
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
        });
      }

      if (Platform.OS === "android") {
        requestPermissionANDROID().then(result => {
          if (result === PermissionsAndroid.RESULTS.GRANTED) {
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
        });
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
          onCameraChange={e => {
            console.log(e);
            if (
              coords.latitude != e.latitude ||
              coords.longitude != e.longitude
            ) {
              setCoords({
                latitude: e.latitude,
                longitude: e.longitude,
              });
            }
            if (zoomSize != e.zoom) {
              setZoomSize(e.zoom);
            }
          }}
          useTextureView>
          <Marker
            coordinate={coords}
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
        <TouchableOpacity
          style={styles.button_container}
          onPress={() => {
            finishSetting(
              zipCode,
              address.join(" ") + addressDetail.join(" "),
              coords.latitude,
              coords.longitude,
            );
          }}>
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
